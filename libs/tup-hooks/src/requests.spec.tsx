import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useGet, usePost } from './requests';
import useJwt from './useJwt';
import { act } from 'react-dom/test-utils';
import { TestWrapper } from '@tacc/tup-testing';
import { vi, Mock } from 'vitest';

vi.mock('./useJwt');
vi.mock('axios');

describe('requests', () => {
  it('should render the mock get component', async () => {
    (useJwt as Mock).mockReturnValue({
      jwt: 'abc123',
      isLoading: false,
      error: null,
    });
    (axios.get as Mock).mockResolvedValue({
      data: 'response',
    });

    vi.spyOn(axios, 'get').mockResolvedValue({ data: 'response' });

    const { result } = renderHook(
      () => useGet<string>({ endpoint: '/endpoint', key: 'key' }),
      {
        wrapper: TestWrapper,
      }
    );
    await waitFor(() => expect(result.current.data).toEqual('response'));
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8001/endpoint', {
      headers: { 'x-tup-token': 'abc123' },
    });
  });
  it('should render the mock post component', async () => {
    (useJwt as Mock).mockReturnValue({
      jwt: 'abc123',
      isLoading: false,
      error: null,
    });
    (axios.post as Mock).mockResolvedValue({
      data: 'response',
    });
    const { result } = renderHook(
      () => usePost<string, string>({ endpoint: '/endpoint' }),
      {
        wrapper: TestWrapper,
      }
    );
    act(() => result.current.mutate('body'));
    await waitFor(() => expect(result.current.data).toEqual('response'));
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8001/endpoint',
      'body',
      { headers: { 'x-tup-token': 'abc123' } }
    );
  });
});
