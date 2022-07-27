import { renderHook, waitFor } from '@testing-library/react';
import { TestWrapper } from '../utils';
import useJwt from './useJwt';

describe('useJwt', () => {
  afterEach(() => {
    document.cookie = 'x-tup-token=';
  });
  it('retrieve a a document cookie', async () => {
    document.cookie = 'x-tup-token=abc123';
    const { result } = renderHook(() => useJwt(), { wrapper: TestWrapper });
    await waitFor(() => expect(result.current.jwt).toEqual('abc123'));
  });
  it('return no cookie when a jwt is not defined', async () => {
    document.cookie = 'x-tup-token=';
    const { result } = renderHook(() => useJwt(), { wrapper: TestWrapper });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    await waitFor(() => expect(result.current.jwt).toBeUndefined());
  });
});
