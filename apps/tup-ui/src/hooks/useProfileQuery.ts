import {
  useQuery,
  UseQueryResult,
} from 'react-query';
import { AxiosStatic } from 'axios';
import useAxios from './useAxios';
import useJwt from './useJwt';
import useConfig from './useConfig';
import { UserProfile } from '.';

async function GetProfileUtil(
  client: AxiosStatic,
  baseUrl: string,
  jwt: string
) {
  const request = await client.get<UserProfile>(`${baseUrl}/auth/profile`, {
    headers: { 'x-tup-token': jwt },
  });
  return request.data;
}

// Query to retrieve the user's profile object.
const useProfileQuery = (): UseQueryResult<UserProfile> => {
  const client = useAxios();
  const config = useConfig();
  const { data: jwt } = useJwt();
  const query = useQuery('profile', () =>
    GetProfileUtil(client, config.baseUrl, jwt ?? '')
  );
  return query;
};

export default useProfileQuery;