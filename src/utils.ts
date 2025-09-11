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
  iframe.allow = 'payment; camera';
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

export const buildWidgetUrl = ({
  baseUrl,
  sessionToken,
  secret,
}: {
  baseUrl: string;
  sessionToken: string;
  secret?: string;
}): string => {
  const url = new URL(baseUrl);
  url.searchParams.set('session_token', sessionToken);

  if (secret) {
    url.searchParams.set('secret', secret);
  }

  return url.toString();
};

export const handleFailedResponse = async <T>({
  response,
  operation,
}: {
  response: Response;
  operation: string;
}): Promise<T> => {
  let errorMessage = `${response.status} ${response.statusText}`;
  try {
    const textBody = await response.text();
    if (textBody) {
      try {
        const errorBody = JSON.parse(textBody);
        errorMessage += ` ${JSON.stringify(errorBody)}`;
      } catch {
        errorMessage += ` ${textBody}`;
      }
    }
  } catch {
    // If reading response body fails, keep the basic error message
  }
  throw new Error(`Failed to ${operation}: ${errorMessage}`);
};
