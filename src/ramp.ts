import { EnvironmentEnum, PostMessageData, RampError, RampInstance, RampLog, RampOptions } from './types.js';
import { buildWidgetUrl, createIframe, getContainer, getWidgetUrl } from './utils.js';

export class ZBDRamp implements RampInstance {
  private iframe: HTMLIFrameElement | null = null;
  private container: HTMLElement | null = null;
  private options: RampOptions;
  private messageListener: ((event: MessageEvent) => void) | null = null;

  constructor(options: RampOptions) {
    this.options = { ...options };
    this.validateOptions();
  }

  private validateOptions(): void {
    if (!this.options.sessionToken) {
      throw new Error('sessionToken is required');
    }
  }

  private setupMessageListener(): void {
    this.messageListener = (event: MessageEvent) => {
      // Only accept messages from the widget domain
      const widgetUrl = getWidgetUrl(this.options.environment || EnvironmentEnum.Production);

      if (!event.origin.includes(new URL(widgetUrl).hostname)) {
        return;
      }

      try {
        let data: PostMessageData;

        if (typeof event.data === 'string') {
          const trimmed = event.data.trim();
          if (!trimmed.startsWith('{') || trimmed.includes('[iFrameResizerChild]')) {
            return;
          }
          data = JSON.parse(event.data);
        } else {
          data = event.data;
        }

        this.handleMessage(data);
      } catch (error) {
        console.warn('Failed to parse message from widget:', error, 'Raw data:', event.data);
      }
    };

    window.addEventListener('message', this.messageListener);
  }

  private handleMessage(data: PostMessageData): void {
    const { type, payload } = data;

    switch (type) {
      case 'WIDGET_SUCCESS':
        this.options.onSuccess?.(payload);
        break;

      case 'WIDGET_ERROR':
        const error: RampError = {
          code: payload?.code || 'UNKNOWN_ERROR',
          message: payload?.message || 'An error occurred',
          details: payload?.details,
        };
        this.options.onError?.(error);
        break;

      case 'WIDGET_STEP_CHANGE':
        this.options.onStepChange?.(payload?.step);
        break;

      case 'WIDGET_LOG':
        const log: RampLog = {
          level: payload?.level || 'info',
          message: payload?.message || '',
          data: payload?.data,
        };
        this.options.onLog?.(log);
        break;

      case 'WIDGET_READY':
        this.options.onReady?.();
        break;

      case 'WIDGET_CLOSE':
        this.options.onClose?.();
        break;

      default:
        console.debug('Unknown message type from widget:', type);
    }
  }

  public mount(container?: HTMLElement | string): void {
    const targetContainer = container || this.options.container;

    if (!targetContainer) {
      throw new Error('Container is required for mounting');
    }

    this.container = getContainer(targetContainer);

    const baseUrl = getWidgetUrl(this.options.environment || EnvironmentEnum.Production);

    const widgetUrl = buildWidgetUrl({
      baseUrl,
      sessionToken: this.options.sessionToken,
    });

    this.iframe = createIframe({
      src: widgetUrl,
      width: this.options.width,
      height: this.options.height,
    });

    this.setupMessageListener();

    this.container.appendChild(this.iframe);
  }

  public unmount(): void {
    if (this.iframe && this.container) {
      this.container.removeChild(this.iframe);
      this.iframe = null;
    }

    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
      this.messageListener = null;
    }
  }

  public destroy(): void {
    this.unmount();
    this.container = null;
    this.options = {} as RampOptions;
  }
}

export const createRamp = (options: RampOptions): RampInstance => {
  return new ZBDRamp(options);
};
