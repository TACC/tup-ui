import { render, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';

const testQueryClient = new QueryClient();
const WrappedApp = () => (
  <QueryClientProvider client={testQueryClient}>
    <App />
  </QueryClientProvider>
);

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WrappedApp />);

    expect(baseElement).toBeTruthy();
    cleanup();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<WrappedApp />);

    expect(getByText(/hello/i)).toBeTruthy();
    cleanup();
  });
});
