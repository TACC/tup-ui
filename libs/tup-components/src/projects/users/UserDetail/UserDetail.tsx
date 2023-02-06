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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserDetail.module.css';

const UserRoleSelector: React.FC<{ projectId: number; user: ProjectUser }> = ({
  user,
  projectId,
}) => {
  const currentUserRole = useRoleForCurrentUser(projectId) ?? '';
  const { mutate: mutateSetDelegate } = useSetProjectDelegate(projectId);
  const { mutate: mutateRemoveDelegate } = useRemoveProjectDelegate(projectId);

  const [confirmState, setConfirmState] = useState<'DEFAULT' | 'CONFIRM'>(
    'DEFAULT'
  );

  const setDelegate = () => {
    mutateSetDelegate(
      { username: user.username },
      {
        onSuccess: () => {
          setConfirmState('DEFAULT');
        },
      }
    );
  };

  const removeDelegate = () => {
    mutateRemoveDelegate(undefined, {
      onSuccess: () => {
        setConfirmState('DEFAULT');
      },
    });
  };
  const canSetDelegate = currentUserRole === 'PI' && user.role !== 'PI';
  if (!canSetDelegate) return null;

  return (
    <>
      {confirmState === 'DEFAULT' && (
        <Button onClick={() => setConfirmState('CONFIRM')} type="link">
          {user.role !== 'Delegate' && 'Set as Project Delegate'}
          {user.role === 'Delegate' && 'Remove as Project Delegate'}
        </Button>
      )}
      {confirmState === 'CONFIRM' && (
        <>
          {user.role !== 'Delegate' && (
            <Button onClick={setDelegate} type="link">
              Confirm Delegate Selection
            </Button>
          )}
          {user.role === 'Delegate' && (
            <Button onClick={removeDelegate} type="link">
              Confirm Delegate Removal
            </Button>
          )}
          <span> | </span>
          <Button onClick={() => setConfirmState('DEFAULT')} type="link">
            Cancel
          </Button>
        </>
      )}
    </>
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
      <Button onClick={() => setConfirmState('CONFIRM')} type="link">
        Remove User
      </Button>
    );
  if (confirmState === 'CONFIRM')
    return (
      <>
        <Button onClick={removeUserCallback} type="link">
          {!isLoading && 'Remove'}{' '}
          {isLoading && <LoadingSpinner placement="inline" />}
        </Button>{' '}
        |{' '}
        <Button onClick={() => setConfirmState('DEFAULT')} type="link">
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
          <span>
            <strong>Role:</strong> {user.role}
          </span>
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
