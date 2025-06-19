// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://1ae2dd0ced0a36834e2d4fb815f5b829@o4509507236134912.ingest.de.sentry.io/4509525574287440',
  integrations: [nodeProfilingIntegration()],
  // Tracing
  attachStacktrace: true,
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

// Profiling happens automatically after setting it up with Sentry.init().
// All spans (unless those discarded by sampling) will have profiling data attached to them.
Sentry.startSpan(
  {
    name: 'BaseSpan',
  },
  () => {
    // The code executed here will be profiled
  },
);
