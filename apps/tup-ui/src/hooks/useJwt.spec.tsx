import { renderHook, waitFor } from '@testing-library/react';
import { testQueryClient } from './utils';
import { QueryClientProvider } from 'react-query';
import useJwt from './useJwt';
import React from 'react';

const wrapper: React.FC<React.PropsWithChildren<{}>> = ({children}) => (
  <QueryClientProvider client={testQueryClient}>
    {children}
  </QueryClientProvider>
);


describe('useJwt', () => {
  afterEach(() => testQueryClient.clear());
  it('retrieve a a document cookie', async () => {
    document.cookie = 'x-tup-token=abc123';
    const { result } = renderHook(() => useJwt(), { wrapper });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.jwt).toEqual("abc123");
  });
  it('return no cookie when a jwt is not defined', async () => {
    document.cookie = 'x-tup-token=';
    const { result } = renderHook(() => useJwt(), { wrapper });
    expect(result.current.jwt).toBeUndefined();
  });
});
