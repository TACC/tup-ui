import { UseQueryResult, useQueryClient } from 'react-query';
import { Grants } from '.';
import { useGet, usePost, usePut } from './requests';

// Query to retrieve the user's grants.
export const useGrants = (id: number): UseQueryResult<Grants[]> => {
  const query = useGet<Grants[]>({
    endpoint: `/projects/${id}/grants`,
    key: 'grants',
  });
  return query;
};

// Mutation to POST a new grant form data to tup-services.
export const useGrantCreate = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePost<FormData, string>({
    endpoint: `/projects/${projectId}/grants`,
    options: {
      onSuccess: () => queryClient.invalidateQueries([`grants`]),
    },
  });
  return mutation;
};

// Mutation to PUT changes to grants form data to tup-services.
export const useGrantEdit = (projectId: number, grantId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePut<FormData, string>({
    endpoint: `/projects/${projectId}/grants/${grantId}`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries([`/projects/${projectId}`]),
    },
  });
  return mutation;
};