import { UseQueryResult } from 'react-query';
import { ProjectsRawSystem } from '.';
import { useGet } from './requests';

// Query to retrieve the user's active projects.
const useProjects = (): UseQueryResult<ProjectsRawSystem[]> => {
  const query = useGet<ProjectsRawSystem[]>({
    endpoint: '/projects',
    key: 'projects',
  });
  return query;
};

export default useProjects;
