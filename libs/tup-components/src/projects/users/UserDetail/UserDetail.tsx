import {
  useProjectUsers,
  useProjectUsage,
  UsagePerResource,
} from '@tacc/tup-hooks';

const UserRoleSelector: React.FC = () => (
  <div>(User role selector placeholder)</div>
);

const RemoveUser: React.FC = () => <div>(User removal placeholder)</div>;

const UserDetail: React.FC<{ projectId: number; username: string }> = ({
  projectId,
  username,
}) => {
  const projectUsers = useProjectUsers(projectId);
  const data = projectUsers.data ?? [];
  const user = data.find((user) => user.username === username);
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

  return user ? (
    <div style={{ width: '50%' }}>
      <div
        style={{
          display: 'flex',
          padding: '2rem',
          background: '#F4F4F4',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <span style={{ fontSize: '21px', fontWeight: 'bold' }}>
          {user.firstName} {user.lastName}
        </span>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          <span style={{ color: '#707070' }}>Username:</span> {user.username} |{' '}
          <span style={{ color: '#707070' }}>Email</span>: {user.email}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          padding: '2rem',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <UserRoleSelector />
        </div>
        <div>
          <RemoveUser />
        </div>
      </div>

      <table className=" " style={{ width: '100%', padding: '2rem' }}>
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
    </div>
  ) : null;
};

export default UserDetail;
