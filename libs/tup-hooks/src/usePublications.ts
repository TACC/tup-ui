import { UseQueryResult } from 'react-query';
import { Publications } from '.';
import { useGet } from './requests';

// Query to retrieve the user's publications.
const usePublications = (projectId: number): UseQueryResult<Publications[]> => {
  const query = useGet<Publications[]>({
    endpoint: `/projects/${projectId}/publications`,
    key: `/projects/${projectId}/publications`,
  });
  return query;
};

export default usePublications;
