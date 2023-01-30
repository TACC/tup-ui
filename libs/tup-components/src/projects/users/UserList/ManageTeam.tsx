import { InlineMessage, LoadingSpinner } from '@tacc/core-components';
import { useProfile, useProjectUsers } from '@tacc/tup-hooks';
import React from 'react';
import { Input, InputGroup, Button, InputGroupAddon } from 'reactstrap';
import styles from './UserList.module.css';

const ManageTeam: React.FC<{ projectId: number }> = ({ projectId }) => {
  const { data: currentUser } = useProfile();
  const { data: users } = useProjectUsers(projectId);
  const currentUserRole =
    (users ?? []).find((user) => user.username === currentUser?.username)
      ?.role || '';

  if (!['PI', 'Delegate'].includes(currentUserRole)) return null;

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('submitting');
  };

  return (
    <>
      <div style={{ paddingTop: '10px', marginRight: '10px' }}>
        <div style={{ paddingBottom: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>
            <strong>Manage Team</strong>
          </span>{' '}
          ({users?.length} Users)
        </div>
        <form onSubmit={(e) => addUser(e)} style={{ paddingBottom: '16px' }}>
          <label htmlFor="add-user">Add New User</label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                type="submit"
                style={{
                  borderColor: '#AFAFAF',
                  backgroundColor: '#F4F4F4',
                  borderRadius: '0',
                  color: '#484848',
                }}
              >
                Add
              </Button>
            </InputGroupAddon>
            <Input placeholder="Enter Username" id="add-user" />
          </InputGroup>
        </form>
      </div>
      <div className={styles['separator']}></div>
    </>
  );
};

export default ManageTeam;
