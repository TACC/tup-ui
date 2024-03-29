import { Button } from '@tacc/core-components';
import { useProject, useRoleForCurrentUser } from '@tacc/tup-hooks';
import styles from './UserList.module.css';
import AddUserModal from './AddUserModal';

const ManageTeam: React.FC<{ projectId: number }> = ({ projectId }) => {
  const currentUserRole = useRoleForCurrentUser(projectId) ?? '';
  const { data: project } = useProject(projectId);
  const chargeCode = project?.chargeCode;

  if (!['PI', 'Delegate'].includes(currentUserRole) || !chargeCode) return null;

  if (chargeCode.startsWith('TG-')) {
    return (
      <div className={styles['user-navactions']}>
        <a
          href="https://allocations.access-ci.org"
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
      <AddUserModal projectId={projectId} />
    </div>
  );
};

export default ManageTeam;
