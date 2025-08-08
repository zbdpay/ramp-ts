# @zbdpay/ramp-ts

Core TypeScript/JavaScript iframe wrapper for ZBD Ramp widget that enables Bitcoin Lightning Network payments in web applications.

## Features

- ✅ **TypeScript First**: Full type safety with comprehensive TypeScript definitions
- ✅ **Environment Support**: Production and sandbox environments (X1, X2, Voltorb)
- ✅ **PostMessage Communication**: Real-time error handling, logging, and step tracking
- ✅ **Customizable**: Iframe dimensions and PostMessage communication
- ✅ **Lightweight**: Minimal dependencies, tree-shakeable

## Installation

```bash
npm install @zbdpay/ramp-ts
# or
yarn add @zbdpay/ramp-ts
# or
pnpm add @zbdpay/ramp-ts
```

## Quick Start

```typescript
import { createRamp, EnvironmentEnum } from '@zbdpay/ramp-ts';

const ramp = createRamp({
  sessionToken: 'your-session-token',
  environment: EnvironmentEnum.Production, // or EnvironmentEnum.X1, EnvironmentEnum.X2, EnvironmentEnum.Voltorb
  container: '#ramp-container',
  onSuccess: (data) => console.log('Success:', data),
  onError: (error) => console.error('Error:', error),
  onStepChange: (step) => console.log('Step:', step),
});

ramp.mount();
```

## API Reference

### createRamp(options)

Creates a new ZBD Ramp instance.

#### Options

```typescript
interface RampOptions {
  sessionToken: string;                      // Required: Your session token
  environment?: EnvironmentEnum;             // Default: EnvironmentEnum.Production
  container?: HTMLElement | string;          // Container element or selector
  width?: string | number;                   // Default: '100%'
  height?: string | number;                  // Default: '600px'
  // Callbacks
  onSuccess?: (data: any) => void;           // Payment successful
  onError?: (error: RampError) => void;      // Error occurred
  onStepChange?: (step: string) => void;     // User navigated to different step
  onLog?: (log: RampLog) => void;           // Debug/info logging
  onReady?: () => void;                      // Widget fully loaded
  onClose?: () => void;                      // User closed widget
}
```

#### Returns

```typescript
interface RampInstance {
  mount: (container?: HTMLElement | string) => void;
  unmount: () => void;
  sendMessage: (message: PostMessageData) => void;
  destroy: () => void;
}
```

## Environment URLs

The package automatically resolves the correct URLs based on your environment configuration:

- **EnvironmentEnum.Production**: `https://ramp.zbdpay.com`
- **EnvironmentEnum.X1**: `https://ramp.x1.zbdpay.com`
- **EnvironmentEnum.X2**: `https://ramp.x2.zbdpay.com`
- **EnvironmentEnum.Voltorb**: `https://ramp.voltorb.zbdpay.com`

## Examples

### Basic Usage

```typescript
import { createRamp, EnvironmentEnum } from '@zbdpay/ramp-ts';

const ramp = createRamp({
  sessionToken: 'your-session-token',
  environment: EnvironmentEnum.Production,
  container: document.getElementById('ramp-container'),
});

ramp.mount();
```

### With Callbacks

```typescript
const ramp = createRamp({
  sessionToken: 'your-session-token',
  environment: EnvironmentEnum.X1,
  onSuccess: (data) => {
    console.log('Payment successful:', data);
    // Handle successful payment
  },
  onError: (error) => {
    console.error('Payment error:', error);
    // Handle error
  },
  onStepChange: (step) => {
    console.log('Current step:', step);
    // Track user progress
  },
});
```

### Iframe Customization

```typescript
const ramp = createRamp({
  sessionToken: 'your-session-token',
  width: '400px',
  height: '500px',
});

// The iframe will have these default styles applied:
// - border: none
// - border-radius: 8px
// - allow: payment
// - allowtransparency: true
```

### Programmatic Control

```typescript
const ramp = createRamp({
  sessionToken: 'your-session-token',
});

// Mount to container
ramp.mount('#my-container');

// Send custom message to iframe
ramp.sendMessage({
  type: 'CUSTOM_EVENT',
  payload: { data: 'value' },
});

// Unmount iframe (keeps instance)
ramp.unmount();

// Clean up completely
ramp.destroy();
```

## Error Handling

```typescript
const ramp = createRamp({
  sessionToken: 'your-session-token',
  onError: (error) => {
    // Error structure: { code: string, message: string, details?: any }
    console.error('Error:', error.code, error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  },
});
```

## TypeScript Support

The package includes comprehensive TypeScript definitions:

```typescript
import type {
  RampConfig,
  RampCallbacks,
  RampOptions,
  RampError,
  RampLog,
  RampInstance,
  EnvironmentEnum,
  PostMessageData,
} from '@zbdpay/ramp-ts';
```

## Framework Integrations

This is the core package. For framework-specific integrations, see:

- **React**: [`@zbdpay/ramp-react`](https://www.npmjs.com/package/@zbdpay/ramp-react)
- **React Native**: [`@zbdpay/ramp-react-native`](https://www.npmjs.com/package/@zbdpay/ramp-react-native)
- **Flutter**: [`zbd_ramp_flutter`](https://pub.dev/packages/zbd_ramp_flutter)

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email dev@zbdpay.com or create an issue on GitHub.