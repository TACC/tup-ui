import { UseQueryResult, useQueryClient } from 'react-query';
import { ProjectsRawSystem, ProjectEditBody } from '.';
import { useGet, usePut } from './requests';

// Query to retrieve the user's active projects.
const useProjects = (): UseQueryResult<ProjectsRawSystem[]> => {
  const query = useGet<ProjectsRawSystem[]>({
    endpoint: '/projects',
    key: 'projects',
  });
  return query;
};

// Mutation to update fields in a project.
export const useProjectUpdate = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePut<ProjectEditBody, string>({
    endpoint: `/projects/${projectId}`,
    options: {
      onSuccess: () => queryClient.invalidateQueries(['projects']),
    },
  });
  return mutation;
};

export default useProjects;
