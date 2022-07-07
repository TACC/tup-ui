import { renderHook, waitFor } from '@testing-library/react';
import { testQueryClient, getTestWrapper } from './utils';
import useJwt from './useJwt';

const wrapper = getTestWrapper(testQueryClient);

describe('useJwt', () => {
  afterEach(() => {
    testQueryClient.clear();
    document.cookie = '';
  });
  it('retrieve a a document cookie', async () => {
    document.cookie = 'x-tup-token=abc123';
    const { result } = renderHook(() => useJwt(), { wrapper });
    await waitFor(() => expect(result.current.jwt).toEqual('abc123'));
  });
  it('return no cookie when a jwt is not defined', async () => {
    document.cookie = 'x-tup-token=';
    const { result } = renderHook(() => useJwt(), { wrapper });
    await waitFor(() => expect(result.current.jwt).toBeUndefined());
  });
});
