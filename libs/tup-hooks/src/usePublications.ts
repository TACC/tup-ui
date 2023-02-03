import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { ProjectPublication, ProjectPublicationBody } from '.';
import { useGet, usePost, usePut } from './requests';

// Query to retrieve the user's publications.
export const usePublications = (
  projectId: number
): UseQueryResult<ProjectPublication[]> => {
  const query = useGet<ProjectPublication[]>({
    endpoint: `/projects/${projectId}/publications`,
    key: ['publications', projectId],
  });
  return query;
};

// Mutation to POST a new publication form data to tup-services.
export const usePublicationCreate = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePost<ProjectPublicationBody, string>({
    endpoint: `/projects/${projectId}/publications`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries(['publications', projectId]),
    },
  });
  return mutation;
};

// Mutation to PUT changes to publications form data to tup-services.
export const usePublicationEdit = (
  projectId: number,
  publicationId: number
) => {
  const queryClient = useQueryClient();
  const mutation = usePut<ProjectPublicationBody, string>({
    endpoint: `/projects/${projectId}/publications/${publicationId}`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries(['publications', projectId]),
    },
  });
  return mutation;
};
