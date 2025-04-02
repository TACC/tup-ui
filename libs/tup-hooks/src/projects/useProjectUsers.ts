import { useMemo} from 'react';
import { useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { ProjectUser } from '.';
import { useDelete, useGet, usePost } from '../requests';
import { useProfile } from '../auth';

// Query to retrieve the user's active projects.
const useProjectUsers = (id: number): UseQueryResult<ProjectUser[]> => {
  const query = useGet<ProjectUser[]>({
    endpoint: `/projects/${id}/users`,
    key: ['projectUsers', id],
  });
  const sortedUsers = useMemo(() => {
    const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base' });
    if (!query.data) return undefined;
    return [...query.data].sort((a, b) => 
      collator.compare(a.lastName, b.lastName)
    );
  }, [query.data]);
  
  return {
    ...query,
    data: sortedUsers
  } as UseQueryResult<ProjectUser[]>;
};

export const useRoleForUser = (projectId: number, username: string) => {
  const { data: projectUsers } = useProjectUsers(projectId);
  const user = projectUsers?.find((u) => u.username === username);
  return user?.role;
};

export const useRoleForCurrentUser = (projectId: number) => {
  const { data: currentUser } = useProfile();
  return useRoleForUser(projectId, currentUser?.username ?? '');
};

export const useAddProjectUser = (projectId: number) => {
  const queryClient = useQueryClient();
  const mutation = usePost<{ username: string }, string>({
    endpoint: `/projects/${projectId}/users`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries(['projectUsers', projectId]),
    },
  });
  return mutation;
};

export const useRemoveProjectUser = (projectId: number, username: string) => {
  const queryClient = useQueryClient();
  const mutation = useDelete<string>({
    endpoint: `/projects/${projectId}/users/${username}`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries(['projectUsers', projectId]),
    },
  });
  return mutation;
};

export default useProjectUsers;
