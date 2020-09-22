import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

//logging as a service (Sentry LaaS)
function init() {
  Sentry.init({
    dsn:
      "https://ce0b3e9559d3471b9f99a16464de0ac3@o451174.ingest.sentry.io/5436679",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error); //capturing unexpected exception
}

export default {
  init,
  log,
};
