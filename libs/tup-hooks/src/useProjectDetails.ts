import { useQueryClient } from 'react-query';
import { ProjectDetails } from '.';
import { usePut } from './requests';

// Mutation to PUT changes to project details form data to tup-services.
export const useProjectDetails = (projectId: number) => {
    const queryClient = useQueryClient();
    const mutation = usePut<{}, string>({
      endpoint: `/projects/${projectId}`,
      options: {
        onSuccess: () =>
          queryClient.invalidateQueries([`/projects/${projectId}`]),
      },
    });
    return mutation;
  };