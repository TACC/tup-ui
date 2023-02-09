import { LoadingSpinner, Button } from '@tacc/core-components';
import {
  useProjectUsers,
  useProjectUsage,
  UsagePerResource,
  ProjectUser,
  useProfile,
  useRemoveProjectUser,
  useRoleForCurrentUser,
  useSetProjectDelegate,
  useRemoveProjectDelegate,
} from '@tacc/tup-hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserDetail.module.css';

const UserRoleSelector: React.FC<{ projectId: number; user: ProjectUser }> = ({
  user,
  projectId,
}) => {
  const currentUserRole = useRoleForCurrentUser(projectId) ?? '';
  const { mutate: mutateSetDelegate } = useSetProjectDelegate(projectId);
  const { mutate: mutateRemoveDelegate } = useRemoveProjectDelegate(projectId);

  const [selectedUserRole, setSelectedUserRole] = useState<string>(
    user.role ?? ''
  );
  useLayoutEffect(() => {
    return setSelectedUserRole(user.role ?? '');
  }, [user]);

  const setRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedUserRole === 'Delegate' && user.role === 'Standard')
      mutateSetDelegate({ username: user.username });
    if (selectedUserRole === 'Standard' && user.role === 'Delegate')
      mutateRemoveDelegate(undefined);
  };

  const canSetDelegate = currentUserRole === 'PI' && user.role !== 'PI';
  if (!canSetDelegate)
    return (
      <span>{user.role === 'Standard' ? 'Standard User' : user.role}</span>
    );

  return (
    <form onSubmit={setRole}>
      <label hidden htmlFor="user-role-select">
        Select a new role for this user.
      </label>
      <select
        value={selectedUserRole}
        onChange={(e) => setSelectedUserRole(e.target.value)}
        id="user-role-select"
      >
        <option value={'Standard'}>Standard User</option>
        <option value={'Delegate'}>Delegate</option>
      </select>{' '}
      {selectedUserRole !== user.role && (
        <Button className={styles['link-button']} type="link" attr="submit">
          Confirm
        </Button>
      )}
    </form>
  );
};

const RemoveUser: React.FC<{ projectId: number; user: ProjectUser }> = ({
  projectId,
  user,
}) => {
  const navigate = useNavigate();
  const { data: currentUser } = useProfile();
  const currentUserRole = useRoleForCurrentUser(projectId) ?? '';

  const [confirmState, setConfirmState] = useState<'DEFAULT' | 'CONFIRM'>(
    'DEFAULT'
  );
  useEffect(() => setConfirmState('DEFAULT'), [user.username]);
  const { mutate, isLoading } = useRemoveProjectUser(projectId, user.username);
  const removeUserCallback = () => {
    mutate(undefined, {
      onSuccess: () => {
        setConfirmState('DEFAULT');
        navigate(`/projects/${projectId}`);
      },
    });
  };

  if (!['PI', 'Delegate'].includes(currentUserRole)) return null;
  if (user.role === 'PI') return null;
  if (user.username === currentUser?.username) return null;

  if (confirmState === 'DEFAULT')
    return (
      <Button
        className={styles['link-button']}
        onClick={() => setConfirmState('CONFIRM')}
        type="link"
      >
        Remove User
      </Button>
    );
  if (confirmState === 'CONFIRM')
    return (
      <>
        <Button
          className={styles['link-button']}
          onClick={removeUserCallback}
          type="link"
        >
          {!isLoading && 'Remove'}{' '}
          {isLoading && <LoadingSpinner placement="inline" />}
        </Button>{' '}
        |{' '}
        <Button
          className={styles['link-button']}
          onClick={() => setConfirmState('DEFAULT')}
          type="link"
        >
          Cancel
        </Button>
      </>
    );

  return <div>(User removal placeholder)</div>;
};

const getPercentUsage = (resource: UsagePerResource): string => {
  const percentage = (resource.used / resource.total) * 100;
  switch (true) {
    case percentage === 0:
      return '0%';
    case percentage < 1:
      return '<1%';
    case isNaN(percentage):
      return '0%';
    default:
      return `${Math.floor(percentage)}%`;
  }
};

const UsageTable: React.FC<{ projectId: number; username: string }> = ({
  projectId,
  username,
}) => {
  const usage = useProjectUsage(projectId, username);
  const usageData = usage.data;

  if (usage.isLoading || !usageData)
    return (
      <div className={styles['usage-table--loading']}>
        <LoadingSpinner />
      </div>
    );

  return (
    <table className={styles['usage-table']}>
      <thead>
        <tr>
          <th>System</th>
          <th>Individual Usage</th>
          <th>% of Allocation</th>
        </tr>
      </thead>
      <tbody>
        {usageData?.map((resource) => (
          <tr key={resource.resource}>
            <th>{resource.resource}</th>
            <th>{resource.used} SU</th>
            <th>{getPercentUsage(resource)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UserDetail: React.FC<{ projectId: number; username: string }> = ({
  projectId,
  username,
}) => {
  const projectUsers = useProjectUsers(projectId);
  const data = projectUsers.data ?? [];
  const user = data.find((user) => user.username === username);

  if (!user) return null;

  return (
    <div className={styles['user-detail-container']}>
      <div className={styles['user-info-banner']}>
        <span className={styles['user-fullname']}>
          {user.firstName} {user.lastName}
        </span>
        <span className={styles['user-details']}>
          <span className={styles['user-details-light']}>Username:</span>{' '}
          {user.username} |{' '}
          <span className={styles['user-details-light']}>Email</span>:{' '}
          {user.email}
        </span>
      </div>
      <div className={styles['manage-user-container']}>
        <div className={styles['role-selector']}>
          <div>Role:</div>{' '}
          <UserRoleSelector projectId={projectId} user={user} />
        </div>
        <div>
          <RemoveUser projectId={projectId} user={user} />
        </div>
      </div>
      <UsageTable username={username} projectId={projectId} />
    </div>
  );
};

export default UserDetail;
