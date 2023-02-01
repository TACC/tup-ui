import { InlineMessage, LoadingSpinner } from '@tacc/core-components';
import { useProfile, useProjectUsers } from '@tacc/tup-hooks';
import React, { useRef } from 'react';
import { Input, InputGroup, Button } from 'reactstrap';
import styles from './UserList.module.css';

const ManageTeam: React.FC<{ projectId: number }> = ({ projectId }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { data: currentUser } = useProfile();
  const { data: users } = useProjectUsers(projectId);
  const currentUserRole =
    (users ?? []).find((user) => user.username === currentUser?.username)
      ?.role || '';

  if (!['PI', 'Delegate'].includes(currentUserRole)) return null;

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    ref.current && ref.current.showPicker();
    console.log('submitting');
  };

  return (
    <>
      <div
        style={{ paddingTop: '10px', marginRight: '10px', marginLeft: '5px' }}
      >
        <div style={{ paddingBottom: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>
            <strong>Manage Team</strong>
          </span>{' '}
          ({users?.length} Users)
        </div>
        <form onSubmit={(e) => addUser(e)} style={{ paddingBottom: '16px' }}>
          <label htmlFor="add-user">Add New User</label>
          <InputGroup>
            <div className="input-group-prepend">
              <Button outline type="submit">
                Add
              </Button>
            </div>
            <Input placeholder="Enter Username" id="add-user" />
          </InputGroup>
        </form>
      </div>
      <div className={styles['separator']}></div>
    </>
  );
};

export default ManageTeam;
