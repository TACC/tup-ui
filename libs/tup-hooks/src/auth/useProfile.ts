import { UseQueryResult } from '@tanstack/react-query';
import { UserProfile } from '.';
import { useGet } from '../requests';

// Query to retrieve the user's profile object.
const useProfile = (): UseQueryResult<UserProfile> => {
  const query = useGet<UserProfile>({
    endpoint: '/users/profile',
    key: ['profile'],
  });
  return query;
};

export default useProfile;
