import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, cacheTime: Infinity } },
});

export const getTestWrapper = (
  testQueryClient: QueryClient
): React.FC<React.PropsWithChildren<unknown>> => {
  return ({ children }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
