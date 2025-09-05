import { EnvironmentEnum, InitRampSessionConfig, InitRampSessionResponse } from './types.js';

const getBaseUrl = (environment: EnvironmentEnum): string => {
  if (environment === EnvironmentEnum.Production) {
    return 'https://api.zbdpay.com';
  }

  return `https://${environment}.zbdpay.com`;
};

export const initRampSession = async ({
  apikey,
  email,
  destination,
  quote_currency,
  base_currency,
  webhook_url,
  reference_id,
  metadata,
  environment = EnvironmentEnum.Production,
}: InitRampSessionConfig): Promise<InitRampSessionResponse> => {
  try {
    const baseUrl = getBaseUrl(environment);

    const body: Record<string, any> = {
      email,
      destination,
      quote_currency,
      base_currency,
    };

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
      throw new Error(`Failed to initialize ramp session: ${errorMessage}`);
    }

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(`Failed to initialize ramp session: ${String(error)}`);
  }
};
