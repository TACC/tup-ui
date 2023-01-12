import { UseQueryResult } from 'react-query';
import { ProjectsAllocations } from '.';
import { useGet } from './requests';

// Query to retrieve the user's active project allocations.
const useProjectAllocations = (project_id: number, allocation_id: number): UseQueryResult<ProjectsAllocations[]> => {
  const query = useGet<ProjectsAllocations[]>({
    endpoint: `/projects/${project_id}/allocations/${allocation_id}/usage`,
    key: 'projectAllocations',
  });
  return query;
};

export default useProjectAllocations;
