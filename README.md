# @zbdpay/ramp-ts

Core TypeScript/JavaScript iframe wrapper for ZBD Ramp widget that enables Bitcoin purchase interface for web applications.

## TL;DR - Quick Start

**Try the interactive example:**

1. **Start local server (to avoid CORS errors when run html file):**
   ```bash
   npx http-server . -p 8000 -o /example/js.html
   ```

2. **Fill the form:**
   - Enter your ZBD API Key
   - Fill email and Lightning destination 
   - Click "Create Session & Load Ramp"

3. **Done!** The widget loads automatically with your session.

## Features

- ✅ **TypeScript First**: Full type safety with comprehensive TypeScript definitions
- ✅ **PostMessage Communication**: Real-time error handling, logging, and step tracking
- ✅ **Lightweight**: No dependencies, tree-shakeable

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
</script>
```

## Quick Start

### 1. Create Session Token

First, create a session token using the ZBD API:

```typescript
import { initRampSession, QuoteCurrencyEnum, BaseCurrencyEnum } from '@zbdpay/ramp-ts';

const response = await initRampSession({
  apikey: 'your-zbd-api-key',
  email: 'user@example.com',
  destination: 'lightning-address-or-username',
  quote_currency: QuoteCurrencyEnum.USD,
  base_currency: BaseCurrencyEnum.BTC,
  webhook_url: 'https://your-webhook-url.com',
});

const sessionToken = response.data.session_token;
```

### 2. Create and Mount Ramp Widget

```typescript
import { createRamp } from '@zbdpay/ramp-ts';

const ramp = createRamp({
  sessionToken,
  container: '#ramp-container',
  onSuccess: (data) => console.log('Success:', data),
  onError: (error) => console.error('Error:', error),
  onStepChange: (step) => console.log('Step:', step),
});

ramp.mount();
```

## API Reference

### initRampSession(config)

Creates a new session token for the ZBD Ramp widget.

#### Parameters

```typescript
interface InitRampSessionConfig {
  apikey: string;                            // Required: Your ZBD API key
  email: string;                             // Required: User's email address
  destination: string;                       // Required: Lightning address or username
  quote_currency: QuoteCurrencyEnum;         // Required: Quote currency (USD)
  base_currency: BaseCurrencyEnum;           // Required: Base currency (BTC)
  webhook_url?: string;                      // Optional: Webhook URL for notifications
  reference_id?: string;                     // Optional: Your reference ID
  metadata?: Record<string, any>;            // Optional: Additional metadata
}
```

#### Returns

```typescript
interface InitRampSessionResponse {
  data: {
    session_token: string;                   // Session token for widget
    expires_at: string;                      // Token expiration time
    widget_url: string;                      // Direct widget URL
  };
  error: string | null;                      // Error message if failed
  success: boolean;                          // Success status
  message: string;                           // Response message
}
```

#### Example

```typescript
import { initRampSession, QuoteCurrencyEnum, BaseCurrencyEnum } from '@zbdpay/ramp-ts';

try {
  const response = await initRampSession({
    apikey: 'your-zbd-api-key',
    email: 'user@example.com',
    destination: 'lightning-address',
    quote_currency: QuoteCurrencyEnum.USD,
    base_currency: BaseCurrencyEnum.BTC,
    webhook_url: 'https://your-webhook.com',
    reference_id: 'order-123',
    metadata: { userId: '456', plan: 'premium' },
  });

  if (response.success) {
    const sessionToken = response.data.session_token;
    // Use sessionToken with createRamp
  } else {
    console.error('Failed to create session:', response.error);
  }
} catch (error) {
  console.error('Session creation error:', error);
}
```

### createRamp(options)

Creates a new ZBD Ramp instance.

#### Options

```typescript
interface RampOptions {
  sessionToken: string;                      // Required: Your session token
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
  destroy: () => void;
}
```

## Examples

### Basic Usage

```typescript
import { createRamp } from '@zbdpay/ramp-ts';

const ramp = createRamp({
  sessionToken: 'your-session-token',
  container: document.getElementById('ramp-container'),
});

ramp.mount();
```

### With Callbacks

```typescript
const ramp = createRamp({
  sessionToken: 'your-session-token',
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
// - min-height: 600px (default)
```

### Programmatic Control

```typescript
const ramp = createRamp({
  sessionToken: 'your-session-token',
});

// Mount to container
ramp.mount('#my-container');

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
  PostMessageData,
  InitRampSessionConfig,
  InitRampSessionData,
  InitRampSessionResponse,
  QuoteCurrencyEnum,
  BaseCurrencyEnum,
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
