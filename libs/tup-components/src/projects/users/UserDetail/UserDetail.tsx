import { LoadingSpinner } from '@tacc/core-components';
import {
  useProjectUsers,
  useProjectUsage,
  UsagePerResource,
} from '@tacc/tup-hooks';
import styles from './UserDetail.module.css';

const UserRoleSelector: React.FC = () => (
  <div>(User role selector placeholder)</div>
);

const RemoveUser: React.FC = () => <div>(User removal placeholder)</div>;

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
            <th>{resource.used}</th>
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
          <UserRoleSelector />
        </div>
        <div>
          <RemoveUser />
        </div>
      </div>
      <UsageTable username={username} projectId={projectId} />
    </div>
  ) : null;
};

export default UserDetail;
