import {
  InlineMessage,
  LoadingSpinner,
  Button as CoreButton,
} from '@tacc/core-components';
import {
  useAddProjectUser,
  useProjectUsers,
  useProject,
  useRoleForCurrentUser,
} from '@tacc/tup-hooks';
import { useState } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';
import styles from './UserList.module.css';

const ManageTeam: React.FC<{ projectId: number }> = ({ projectId }) => {
  const { data: users } = useProjectUsers(projectId);
  const currentUserRole = useRoleForCurrentUser(projectId) ?? '';
  const { mutate, isLoading, error } = useAddProjectUser(projectId);
  const [userToAdd, setUserToAdd] = useState<string>('');
  const { data: project } = useProject(projectId);
  const chargeCode = project?.chargeCode;

  if (!['PI', 'Delegate'].includes(currentUserRole) || !chargeCode) return null;

  if (chargeCode.startsWith('TG-')) {
    return (
      <div className={styles['manage-team']} style={{ paddingBottom: '5px' }}>
        <a
          className={styles['access-button']}
          href="https://allocations.access-ci.org/user_management"
          target="_blank"
          rel="noreferrer"
        >
          <CoreButton type="primary">Manage Team on ACCESS</CoreButton>
        </a>
      </div>
    );
  }

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (userToAdd)
      mutate(
        { username: userToAdd },
        {
          onSuccess: () => setUserToAdd(''),
        }
      );
  };

  return (
    <>
      <div className={styles['manage-team']}>
        <div>
          <strong>Manage Team</strong> ({users?.length} Users)
        </div>
        <form onSubmit={(e) => addUser(e)}>
          <label htmlFor="add-user">Add New User</label> (use TACC username)
          <InputGroup>
            <div className="input-group-prepend">
              <Button outline type="submit" disabled={!userToAdd}>
                {!isLoading && 'Add'}
                {isLoading && <LoadingSpinner placement="inline" />}
              </Button>
            </div>
            <Input
              placeholder="Enter Username"
              value={userToAdd}
              id="add-user"
              onChange={(e) => setUserToAdd(e.target.value)}
            />
          </InputGroup>
        </form>
        {error && (
          <InlineMessage type="error">
            The user could not be added.
          </InlineMessage>
        )}
      </div>
      <div className={styles['separator']}></div>
    </>
  );
};

export default ManageTeam;
