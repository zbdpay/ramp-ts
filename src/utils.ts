import { EnvironmentEnum } from './types.js';

export const getWidgetUrl = (environment: EnvironmentEnum): string => {
  if (environment === EnvironmentEnum.Production) {
    return 'https://ramp.zbdpay.com';
  }

  return `https://ramp.${environment}.zbdpay.com`;
};

export const createIframe = ({
  src,
  width = '100%',
  height = '100%',
}: {
  src: string;
  width?: string | number;
  height?: string | number;
}): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');

  iframe.src = src;
  iframe.style.width = typeof width === 'number' ? `${width}px` : width;
  iframe.style.height = typeof height === 'number' ? `${height}px` : height;
  iframe.style.minHeight = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  iframe.allow = 'payment';
  iframe.setAttribute('allowtransparency', 'true');

  return iframe;
};

export const getContainer = (container?: HTMLElement | string): HTMLElement => {
  if (!container) {
    throw new Error('Container is required');
  }

  if (typeof container === 'string') {
    const element = document.querySelector(container) as HTMLElement;
    if (!element) {
      throw new Error(`Container element not found: ${container}`);
    }
    return element;
  }

  return container;
};

export const buildWidgetUrl = ({ baseUrl, sessionToken }: { baseUrl: string; sessionToken: string }): string => {
  const url = new URL(baseUrl);
  url.searchParams.set('session_token', sessionToken);

  return url.toString();
};
