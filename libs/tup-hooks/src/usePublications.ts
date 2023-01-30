import { UseQueryResult, useQueryClient } from 'react-query';
import { Publications } from '.';
import { useGet, usePost, usePut, useDelete } from './requests';

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
  const mutation = usePost<{}, string>({
    endpoint: `/projects/${projectId}/publications`,
    options: {
      onSuccess: () => queryClient.invalidateQueries([`/projects/${projectId}/publications`]),
    },
  });
  return mutation;
};

// Mutation to PUT changes to publications form data to tup-services.
export const usePublicationEdit = (projectId: number, publicationId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePut<{}, string>({
    endpoint: `/projects/${projectId}/publications/${publicationId}`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries([`/projects/${projectId}/publications`]),
    },
  });
  return mutation;
};

// Mutation to DELETE a grant from tup-services.
export const usePublicationDelete = (projectId: number, publicationId: number) => {
  const queryClient = useQueryClient();
  const mutation = useDelete<string>({
    endpoint: `/projects/${projectId}/publications/${publicationId}`,
    options: { 
      onSuccess: () => 
      queryClient.invalidateQueries([`/projects/${projectId}/publications`]), 
    },
  });
  return mutation;
};
