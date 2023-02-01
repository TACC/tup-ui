import { UseQueryResult } from 'react-query';
import { ProjectUser, useProfile } from '.';
import { useGet } from './requests';

// Query to retrieve the user's active projects.
const useProjectUsers = (id: number): UseQueryResult<ProjectUser[]> => {
  const query = useGet<ProjectUser[]>({
    endpoint: `/projects/${id}/users`,
    key: ['projectUsers', id],
  });
  return query;
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

export default useProjectUsers;
