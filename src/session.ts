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

  const response = await fetch(`${baseUrl}/v1/ramp-widget`, {
    method: 'POST',
    headers: {
      apikey: apikey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to initialize ramp session: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
