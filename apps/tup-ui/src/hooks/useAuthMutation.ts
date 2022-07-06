import { useQueryClient, useMutation } from 'react-query';
import { AxiosStatic } from 'axios';
import { AuthResponse } from '.';
import useConfig from './useConfig';
import useAxios from './useAxios';
import Cookies from 'js-cookie';

async function authUtil(
  client: AxiosStatic,
  baseUrl: string,
  username: string,
  password: string
) {
  const request = await client.post<AuthResponse>(`${baseUrl}/auth`, {
    username,
    password,
  });

  return request.data;
}


// Mutation to POST credentials to tup-services and retrieve the user's JWT.
const useAuthMutation = () => {
  const client = useAxios();
  const config = useConfig();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const result = await authUtil(client, config.baseUrl, username, password);
      const expirationDate = new Date(Date.now() + result.ttl * 1000);
      Cookies.set('x-tup-token', result.jwt, { expires: expirationDate });
      // Invalidate the jwt query to trigger rerender of any component that uses it.
      queryClient.invalidateQueries('jwt');
    }
  );
  return mutation;
};

export default useAuthMutation;