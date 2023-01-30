import { UseQueryResult } from 'react-query';
import { ProjectUser } from '.';
import { useGet } from './requests';

// Query to retrieve the user's active projects.
const useProjectUsers = (id: number): UseQueryResult<ProjectUser[]> => {
  const query = useGet<ProjectUser[]>({
    endpoint: `/projects/${id}/users`,
    key: ['projectUsers', id],
  });
  return query;
};

export default useProjectUsers;
