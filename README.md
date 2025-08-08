# @zbdpay/ramp-ts

Core TypeScript/JavaScript iframe wrapper for ZBD Ramp widget that enables Bitcoin Lightning Network payments in web applications.

## TL;DR - Quick Start

**Try the interactive example:**

1. **Start local server (to avoid CORS errors when run html file):**
   ```bash
   cd ramp-ts && npx http-server . -p 8000 -o
   ```

2. **Open in browser:** 
   `http://localhost:8000/example/js.html`

3. **Fill the form:**
   - Enter your ZBD API Key
   - Fill email and Lightning destination 
   - Click "Create Session & Load Ramp"

4. **Done!** The widget loads automatically with your session.

## Features

- ✅ **TypeScript First**: Full type safety with comprehensive TypeScript definitions
- ✅ **Environment Support**: Production and sandbox environments (X1, X2, Voltorb)
- ✅ **PostMessage Communication**: Real-time error handling, logging, and step tracking
- ✅ **Customizable**: Iframe dimensions and PostMessage communication
- ✅ **Lightweight**: Minimal dependencies, tree-shakeable

## Installation

### Via npm/yarn (recommended)

```bash
npm install @zbdpay/ramp-ts
# or
yarn add @zbdpay/ramp-ts
# or
pnpm add @zbdpay/ramp-ts
```

### Via CDN (no build step)

```html
<script type="module">
  import { createRamp } from 'https://cdn.jsdelivr.net/npm/@zbdpay/ramp-ts/dist/src/index.js';
  // use createRamp
</script>
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
  height?: string | number;                  // Default: '100%'
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
// - width: 100% (default)
// - height: 100% (default)
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

## Examples

### Simple Iframe (No JavaScript Required)

The simplest way to integrate ZBD Ramp is with a basic iframe:

```html
<iframe 
    src="https://ramp.zbdpay.com?session_token=YOUR_SESSION_TOKEN"
    width="100%" 
    height="600px"
    allow="payment"
    style="border: none; border-radius: 8px;">
</iframe>
```

**Environment URLs:**
- Production: `https://ramp.zbdpay.com`
- X1 Sandbox: `https://ramp.x1.zbdpay.com`
- X2 Sandbox: `https://ramp.x2.zbdpay.com` 
- Voltorb Sandbox: `https://ramp.voltorb.zbdpay.com`

### JavaScript Library Example

For advanced features like event handling and programmatic control, use the JavaScript library. A complete example is available in the `example/` directory.

### Running the Example Locally

1. **Navigate to the ramp-ts directory:**
   ```bash
   cd ramp-ts
   ```

2. **Start a local HTTP server:**
   ```bash
   npx http-server . -p 8000 -o
   ```

3. **Open the example:**
   Navigate to `http://localhost:8000/example/`

4. **Use with session token:**
   - Enter your session token in the input field, or
   - Pass it as a URL parameter: `http://localhost:8000/example/?session_token=your_token`

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email dev@zbdpay.com or create an issue on GitHub.