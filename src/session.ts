import {
  EnvironmentEnum,
  InitRampSessionConfig,
  InitRampSessionResponse,
  RefreshAccessTokenConfig,
  RefreshAccessTokenResponse,
} from './types.js';
import { handleFailedResponse } from './utils.js';

const getBaseUrl = (environment: EnvironmentEnum): string => {
  if (environment === EnvironmentEnum.Production) {
    return 'https://api.zbdpay.com';
  }

  return `https://${environment}.zbdpay.com`;
};

export const initRampSession = async ({
  apikey,
  destination,
  quote_currency,
  base_currency,
  webhook_url,
  reference_id,
  metadata,
  environment = EnvironmentEnum.Production,
  ...authConfig
}: InitRampSessionConfig): Promise<InitRampSessionResponse> => {
  try {
    const baseUrl = getBaseUrl(environment);

    const body: Record<string, any> = {
      destination,
      quote_currency,
      base_currency,
    };

    if ('email' in authConfig) {
      body.email = authConfig.email;
    } else if ('access_token' in authConfig) {
      body.access_token = authConfig.access_token;
    }

    if (webhook_url) {
      body.webhook_url = webhook_url;
    }

    if (reference_id) {
      body.reference_id = reference_id;
    }

    if (metadata) {
      body.metadata = metadata;
    }

    const response = await fetch(`${baseUrl}/api/v1/ramp-widget`, {
      method: 'POST',
      headers: {
        apikey: apikey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return handleFailedResponse<InitRampSessionResponse>({ response, operation: 'initRampSession' });
    }

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(`Failed to initialize ramp session: ${String(error)}`);
  }
};

export const refreshAccessToken = async ({
  apikey,
  access_token_id,
  refresh_token,
  environment = EnvironmentEnum.Production,
}: RefreshAccessTokenConfig): Promise<RefreshAccessTokenResponse> => {
  try {
    const baseUrl = getBaseUrl(environment);

    const body = {
      access_token_id,
      refresh_token,
    };

    const response = await fetch(`${baseUrl}/api/v1/access-tokens/refresh`, {
      method: 'POST',
      headers: {
        apikey: apikey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return handleFailedResponse<RefreshAccessTokenResponse>({ response, operation: 'refreshAccessToken' });
    }

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(`Failed to refresh access token: ${String(error)}`);
  }
};
