import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { ProjectGrant, ProjectGrantBody } from '.';
import { useGet, usePost, usePut, useDelete } from '../requests';

// Query to retrieve the user's grants.
export const useGrants = (id: number): UseQueryResult<ProjectGrant[]> => {
  const query = useGet<ProjectGrant[]>({
    endpoint: `/projects/${id}/grants`,
    key: ['grants', id],
  });
  return query;
};

// Mutation to POST a new grant form data to tup-services.
export const useGrantCreate = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePost<ProjectGrantBody, string>({
    endpoint: `/projects/${projectId}/grants`,
    options: {
      onSuccess: () => queryClient.invalidateQueries(['grants', projectId]),
    },
  });
  return mutation;
};

// Mutation to PUT changes to grants form data to tup-services.
export const useGrantEdit = (projectId: number, grantId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePut<ProjectGrant, string>({
    endpoint: `/projects/${projectId}/grants/${grantId}`,
    options: {
      onSuccess: () => queryClient.invalidateQueries(['grants', projectId]),
    },
  });
  return mutation;
};

export const useGrantDelete = (projectId: number, grantId: number) => {
  const queryClient = useQueryClient();
  const mutation = useDelete<string>({
    endpoint: `/projects/${projectId}/grants/${grantId}`,
    options: {
      onSuccess: () => queryClient.invalidateQueries(['grants', projectId]),
    },
  });
  return mutation;
};
