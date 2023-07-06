import { UseQueryResult } from '@tanstack/react-query';
import { UserSearchResult } from '.';
import { useGet } from '../requests';

// Query to retrieve the user's profile object.
const useUserLookup = (
  projectId: number,
  userQuery: string,
  field: 'username' | 'last_name' | 'email'
): UseQueryResult<UserSearchResult[]> => {
  const query = useGet<UserSearchResult[]>({
    endpoint: `/users/search?query=${userQuery}&field=${field}`,
    key: ['user-lookup', projectId],
    options: {
      // We only want to fetch when the user submits a query.
      enabled: false,
      cacheTime: 0,
    },
  });
  return query;
};

export default useUserLookup;
