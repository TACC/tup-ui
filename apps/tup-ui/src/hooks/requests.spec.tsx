import React, { useEffect } from 'react';
import { render, renderHook, waitFor, screen } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AxiosClientContext } from './useAxios';
import { useGet, usePost } from './requests';
import { testQueryClient } from './utils';
import useJwt from './useJwt';
import { act } from 'react-dom/test-utils';

jest.mock('./useJwt');
jest.mock('axios');

const wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <QueryClientProvider client={testQueryClient}>
    {children}
  </QueryClientProvider>
);


describe('requests', () => {
  afterEach(() => testQueryClient.clear());
  it('should render the mock get component', async () => {
    (useJwt as jest.Mock).mockReturnValue({
      jwt: 'abc123',
      isLoading: false,
      error: null,
    });
    (axios.get as jest.Mock).mockResolvedValue({
      data: 'response'
    })

    jest.spyOn(axios, 'get').mockResolvedValue({ data: 'response' });

    const { result } = renderHook(() => useGet<string>("/endpoint", "key"), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual("response"));
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:8000/endpoint',
      { headers: { 'x-tup-token': 'abc123' } }
    );
  });
  it('should render the mock post component', async () => {
    (useJwt as jest.Mock).mockReturnValue({
      jwt: 'abc123',
      isLoading: false,
      error: null,
    });
    (axios.post as jest.Mock).mockResolvedValue({
      data: 'response'
    })
    const { result } = renderHook(() => usePost<string, string>("/endpoint"), { wrapper });
    await act(() => result.current.mutate("body"));
    await waitFor(() => expect(result.current.data).toEqual("response"));
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/endpoint',
      'body',
      { headers: { 'x-tup-token': 'abc123' } }
    );
  });
});
