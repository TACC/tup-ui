import { useQueryClient } from 'react-query';
import { Abstract } from '.';
import { usePut } from './requests';

// Mutation to PUT changes to abstract form data to tup-services.
export const useAbstract = (projectId: number) => {
    const queryClient = useQueryClient();
    const mutation = usePut<FormData, string>({
      endpoint: `/projects/${projectId}`,
      options: {
        onSuccess: () =>
          queryClient.invalidateQueries([`/projects/${projectId}`]),
      },
    });
    return mutation;
  };