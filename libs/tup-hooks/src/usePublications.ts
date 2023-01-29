import { UseQueryResult, useQueryClient } from 'react-query';
import { Publications } from '.';
import { useGet, usePost, usePut } from './requests';

// Query to retrieve the user's publications.
export const usePublications = (projectId: number): UseQueryResult<Publications[]> => {
  const query = useGet<Publications[]>({
    endpoint: `/projects/${projectId}/publications`,
    key: `/projects/${projectId}/publications`,
  });
  return query;
};

// Mutation to POST a new publication form data to tup-services.
export const usePublicationCreate = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePost<FormData, string>({
    endpoint: `/projects/${projectId}/publications`,
    options: {
      onSuccess: () => queryClient.invalidateQueries([`projects`]),
    },
  });
  return mutation;
};

// Mutation to PUT changes to publications form data to tup-services.
export const usePublicationEdit = (projectId: number, publicationId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePut<FormData, string>({
    endpoint: `/projects/${projectId}/publications/${publicationId}`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries([`/projects/${projectId}`]),
    },
  });
  return mutation;
};