import { Button } from '@tacc/core-components';
import { useProject, useRoleForCurrentUser } from '@tacc/tup-hooks';
import styles from './UserList.module.css';

const ManageTeam: React.FC<{ projectId: number }> = ({ projectId }) => {
  const currentUserRole = useRoleForCurrentUser(projectId) ?? '';
  const { data: project } = useProject(projectId);
  const chargeCode = project?.chargeCode;

  if (!['PI', 'Delegate'].includes(currentUserRole) || !chargeCode) return null;

  if (chargeCode.startsWith('TG-')) {
    return (
      <div className={styles['user-navactions']}>
        <a
          href="https://allocations.access-ci.org/user_management"
          target="_blank"
          rel="noreferrer"
        >
          <Button type="primary">Manage Team on ACCESS</Button>
        </a>
      </div>
    );
  }

  return (
    <div className={styles['user-navactions']}>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://accounts.tacc.utexas.edu/project_invite?project_id=${projectId}`}
      >
        <Button>+ Add Users</Button>
      </a>
    </div>
  );
};

export default ManageTeam;
