import { useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { AxiosStatic, AxiosResponse } from 'axios';
import { AuthResponse, AuthBody } from '.';
import Cookies from 'js-cookie';
import { usePost } from './requests';
import useJwt from './useJwt';

// Mutation to POST credentials to tup-services and retrieve the user's JWT.
const useAuth = () => {
  const queryClient = useQueryClient();
  const { jwt } = useJwt();
  const logout = useCallback(
    () => {
      Cookies.remove('x-tup-token');
      queryClient.invalidateQueries('jwt');
    },
    [ queryClient ]
  )
  const authCallback = useCallback(
    (response: AxiosResponse<AuthResponse, any>) => {
      const expirationDate = new Date(Date.now() + response.data.ttl * 1000);
      Cookies.set('x-tup-token', response.data.jwt, { expires: expirationDate });
      // Invalidate the jwt query to trigger rerender of any component that uses it.
      queryClient.invalidateQueries('jwt');
    },
    [ queryClient ]
  )
  const mutation = usePost<AuthBody, AuthResponse>('/auth', authCallback);
  const { mutate: login, isLoading, error } = mutation;
  const loggedIn: boolean = !!jwt;
  return {
    login,
    logout,
    loggedIn,
    isLoading,
    error
  }
};

export default useAuth;