import { UseQueryResult } from 'react-query';
import { Publications } from '.';
import { useGet } from './requests';

// Query to retrieve the user's publications.
const usePublications = (id: number): UseQueryResult<Publications[]> => {
  const query = useGet<Publications[]>({
    endpoint: `/projects/${id}/publications`,
    key: 'publications',
  });
  return query;
};

export default usePublications;
