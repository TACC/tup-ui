import { UseQueryResult } from 'react-query';
import { Grants } from '.';
import { useGet } from './requests';

// Query to retrieve the user's grants.
const useGrants = (id: number): UseQueryResult<Grants[]> => {
  const query = useGet<Grants[]>({
    endpoint: `/projects/${id}/grants`,
    key: 'grants',
  });
  return query;
};

export default useGrants;
