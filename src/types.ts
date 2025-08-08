export enum EnvironmentEnum {
  Production = 'production',
  X1 = 'x1',
  X2 = 'x2',
  Voltorb = 'voltorb',
}

export interface RampConfig {
  sessionToken: string;
  environment?: EnvironmentEnum;
}

export interface RampCallbacks {
  onSuccess?: (data: any) => void;
  onError?: (error: RampError) => void;
  onStepChange?: (step: string) => void;
  onLog?: (log: RampLog) => void;
  onReady?: () => void;
  onClose?: () => void;
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
  type: string;
  payload?: any;
}

export interface RampInstance {
  mount: (container?: HTMLElement | string) => void;
  unmount: () => void;
  destroy: () => void;
}
