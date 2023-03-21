import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Sysmon from './Sysmon/Sysmon';
import SoftwareTable from './Software/Software';
const queryClient = new QueryClient({
  logger: {
    log: window.console.log,
    warn: window.console.warn,
    error: () => {
      /* */
    },
  },
});

const sysmonDOM = document.getElementById('cms-sysmon');
if (sysmonDOM) {
  const sysmonRoot = ReactDOM.createRoot(sysmonDOM as HTMLElement);
  sysmonRoot.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Sysmon />
      </QueryClientProvider>
    </StrictMode>
  );
}

const SoftwareDOM = document.getElementById('cms-software');
if (SoftwareDOM) {
  const softwareRoot = ReactDOM.createRoot(SoftwareDOM as HTMLElement);
  softwareRoot.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SoftwareTable />
      </QueryClientProvider>
    </StrictMode>
  );
}

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
