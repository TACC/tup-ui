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

  // Provide a logout callback that removes the x-tup-token cookie
  const logout = useCallback(
    () => {
      Cookies.remove('x-tup-token');
      // Invalidate the jwt query to trigger rerender of any component that uses it.
      queryClient.invalidateQueries('jwt');
    },
    [ queryClient ]
  )

  // Provide an auth callback that does something with the /auth response
  const onSuccess = useCallback(
    (response: AuthResponse) => {
      const expirationDate = new Date(Date.now() + response.ttl * 1000);
      Cookies.set('x-tup-token', response.jwt, { expires: expirationDate });
      // Invalidate the jwt query to trigger rerender of any component that uses it.
      queryClient.invalidateQueries('jwt');
    },
    [ queryClient ]
  )

  // Use the post hook with the auth endpoint and the callback
  const mutation = usePost<AuthBody, AuthResponse>('/auth', { onSuccess });

  // Rename some of the default react-query functions to be meaningful to this hook's functions
  const { mutate: login, ...extra } = mutation;

  // Derive the loggedIn state from the JWT cookie
  const loggedIn: boolean = !!jwt;

  // Return 
  return {
    login,
    logout,
    loggedIn,
    ...extra
  }
};

export default useAuth;