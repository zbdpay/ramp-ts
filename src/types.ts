export enum EnvironmentEnum {
  Production = 'production',
  X1 = 'x1',
  X2 = 'x2',
  Voltorb = 'voltorb',
}

export enum QuoteCurrencyEnum {
  USD = 'USD',
}

export enum BaseCurrencyEnum {
  BTC = 'BTC',
}

export enum WidgetPostMessageEnum {
  StepChange = 'WIDGET_STEP_CHANGE',
  Error = 'WIDGET_ERROR',
  Ready = 'WIDGET_READY',
  KYCStatusChange = 'WIDGET_KYC_STATUS_CHANGE',
  TransactionComplete = 'WIDGET_TRANSACTION_COMPLETE',
}

export interface RampConfig {
  sessionToken: string;
  environment?: EnvironmentEnum;
  secret?: string;
}

export interface RampCallbacks {
  onSuccess?: (data: any) => void;
  onError?: (error: RampError) => void;
  onStepChange?: (step: string) => void;
  onLog?: (log: RampLog) => void;
  onReady?: () => void;
}

export interface RampError {
  code: string;
  message: string;
  details?: any;
}

export interface RampLog {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: any;
}

export interface RampOptions extends RampConfig, RampCallbacks {
  container?: HTMLElement | string;
  width?: string | number;
  height?: string | number;
}

export interface PostMessageData {
  type: WidgetPostMessageEnum;
  payload?: any;
}

export interface RampInstance {
  mount: (container?: HTMLElement | string) => void;
  unmount: () => void;
  destroy: () => void;
}

export interface InitRampSessionConfig {
  apikey: string;
  email: string;
  destination: string;
  quote_currency: QuoteCurrencyEnum;
  base_currency: BaseCurrencyEnum;
  webhook_url?: string;
  reference_id?: string;
  metadata?: Record<string, any>;
  environment?: EnvironmentEnum;
}

export interface InitRampSessionData {
  session_token: string;
  expires_at: string;
  widget_url: string;
}

export interface InitRampSessionResponse {
  data: InitRampSessionData;
  error: string | null;
  success: boolean;
  message: string;
}
