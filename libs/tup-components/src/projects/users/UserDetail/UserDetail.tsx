import { LoadingSpinner, Button } from '@tacc/core-components';
import {
  useProjectUsers,
  useProjectUsage,
  UsagePerResource,
  ProjectUser,
  useProfile,
} from '@tacc/tup-hooks';
import { useState } from 'react';
import styles from './UserDetail.module.css';

const UserRoleSelector: React.FC<{ projectId: number; user: ProjectUser }> = ({
  user,
  projectId,
}) => {
  const { data: currentUser } = useProfile();
  const projectUsers = useProjectUsers(projectId);
  const projectCurrentUser = (projectUsers.data ?? []).find(
    (user) => user.username === currentUser?.username
  );
  const [confirmState, setConfirmState] = useState<'DEFAULT' | 'CONFIRM'>(
    'DEFAULT'
  );
  const mutate = () => {
    console.log('setting delegate');
  };

  const canSetDelegate =
    user.role === 'Standard' && projectCurrentUser?.role === 'PI';
  return (
    <div>
      <strong>Role:</strong> {user.role}{' '}
      {canSetDelegate && confirmState === 'DEFAULT' && (
        <Button onClick={() => setConfirmState('CONFIRM')} type="link">
          Set as Project Delegate
        </Button>
      )}
      {canSetDelegate && confirmState === 'CONFIRM' && (
        <>
          <Button onClick={() => mutate()} type="link">
            Confirm Delegate Selection
          </Button>{' '}
          |{' '}
          <Button onClick={() => setConfirmState('DEFAULT')} type="link">
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

const RemoveUser: React.FC<{ projectId: number; user: ProjectUser }> = ({
  projectId,
  user,
}) => {
  const { data: currentUser } = useProfile();
  const projectUsers = useProjectUsers(projectId);
  const projectCurrentUser = (projectUsers.data ?? []).find(
    (user) => user.username === currentUser?.username
  );
  const [confirmState, setConfirmState] = useState<'DEFAULT' | 'CONFIRM'>(
    'DEFAULT'
  );

  const mutate = () => {
    console.log('remove user');
  };

  if (!['PI', 'Delegate'].includes(projectCurrentUser?.role ?? '')) return null;
  if (user.role === 'PI') return null;
  if (user.username === currentUser?.username) return null;

  if (confirmState === 'DEFAULT')
    return (
      <Button onClick={() => setConfirmState('CONFIRM')} type="link">
        Remove User
      </Button>
    );
  if (confirmState === 'CONFIRM')
    return (
      <>
        <Button onClick={() => mutate()} type="link">
          Remove
        </Button>{' '}
        |{' '}
        <Button onClick={() => setConfirmState('DEFAULT')} type="link">
          Cancel
        </Button>
      </>
    );

  return <div>(User removal placeholder)</div>;
};

const UsageTable: React.FC<{ projectId: number; username: string }> = ({
  projectId,
  username,
}) => {
  const usage = useProjectUsage(projectId, username);
  const usageData = usage.data;

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

  return user ? (
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
        <div>
          <UserRoleSelector projectId={projectId} user={user} />
        </div>
        <div>
          <RemoveUser projectId={projectId} user={user} />
        </div>
      </div>
      <UsageTable username={username} projectId={projectId} />
    </div>
  ) : null;
};

export default UserDetail;
