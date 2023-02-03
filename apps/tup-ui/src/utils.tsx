import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

export const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, cacheTime: Infinity } },
});

export const TestWrapper: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export const testRender = (node: React.ReactNode) => {
  return render(<TestWrapper>{node}</TestWrapper>);
};
