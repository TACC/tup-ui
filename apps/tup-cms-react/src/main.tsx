import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Sysmon from './Sysmon/Sysmon';
const queryClient = new QueryClient({
  logger: {
    log: window.console.log,
    warn: window.console.warn,
    error: () => {
      /* */
    },
  },
});

const sysmonRoot = ReactDOM.createRoot(
  document.getElementById('cms-sysmon') as HTMLElement
);
sysmonRoot.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Sysmon />
    </QueryClientProvider>
  </StrictMode>
);

/*
const otherThingRoot = ReactDOM.createRoot(
  document.getElementById('cms-other-thing') as HTMLElement
);
otherThingRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
);
*/
