import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ProjectsRawSystem, ProjectEditBody } from '.';
import { useDelete, useGet, usePut } from '../requests';

// Query to retrieve the user's active projects.
const useProjects = (): UseQueryResult<ProjectsRawSystem[]> => {
  const query = useGet<ProjectsRawSystem[]>({
    endpoint: '/projects',
    key: ['projects'],
    options: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  });
  return query;
};

export const useProject = (
  projectId: number
): UseQueryResult<ProjectsRawSystem | undefined> => {
  const projectsQuery = useProjects();
  const projectQuery = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => {
      return projectsQuery.data?.find((project) => project.id === projectId);
    },
    enabled: !!projectsQuery.data,
  });

  return projectQuery;
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

export const useSetProjectDelegate = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePut<{ username: string }, string>({
    endpoint: `/projects/${projectId}/delegate`,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['projects']);
        queryClient.invalidateQueries(['projectUsers', projectId]);
      },
    },
  });
  return mutation;
};

export const useRemoveProjectDelegate = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = useDelete<string>({
    endpoint: `/projects/${projectId}/delegate`,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['projects']);
        queryClient.invalidateQueries(['projectUsers', projectId]);
      },
    },
  });
  return mutation;
};

export default useProjects;
