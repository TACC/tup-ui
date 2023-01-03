import { UseQueryResult } from 'react-query';
import { ProjectsAllocations } from '.';
import { useGet } from './requests';

// Query to retrieve the user's active projects.
const useProjectsAllocations = (): UseQueryResult<ProjectsAllocations[]> => {
  const query = useGet<ProjectsAllocations[]>({
    endpoint: '/projects',
    key: 'projects',
  });
  return query;
};

export default useProjectsAllocations;