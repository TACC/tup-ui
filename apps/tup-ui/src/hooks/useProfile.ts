import { UseQueryResult } from 'react-query';
import { UserProfile } from '.';
import { useGet } from './requests';

// Query to retrieve the user's profile object.
const useProfile = (): UseQueryResult<UserProfile> => {
  const query = useGet<UserProfile>('/auth/profile', 'profile');
  return query;
};

export default useProfile;
