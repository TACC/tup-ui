import {
  Button,
  LoadingSpinner,
  Icon,
  SectionMessage,
  SectionTableWrapper,
} from '@tacc/core-components';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input } from 'reactstrap';
import React, { useState } from 'react';
import {
  useUserLookup,
  UserSearchResult,
  useProjectUsers,
  useAddProjectUser,
  useRemoveProjectUser,
} from '@tacc/tup-hooks';

import styles from './AddUserModal.module.css';
import stylesUserList from './UserList.module.css';

type FieldValue = 'email' | 'username' | 'last_name';

const AddUserButton: React.FC<{ username: string; projectId: number }> = ({
  username,
  projectId,
}) => {
  const { mutate, isLoading } = useAddProjectUser(projectId);
  if (isLoading) return <LoadingSpinner placement="inline" />;
  return (
    <Button type="link" onClick={() => mutate({ username })}>
      + Add User
    </Button>
  );
};

const RemoveUser: React.FC<{ username: string; projectId: number }> = ({
  username,
  projectId,
}) => {
  const { mutate, isLoading } = useRemoveProjectUser(projectId, username);
  if (isLoading)
    return (
      <div>
        <LoadingSpinner placement="inline" />
      </div>
    );
  return (
    <>
      <Icon name="approved-reverse" className={styles['success-icon']}></Icon>{' '}
      Added &nbsp;| &nbsp;
      <Button type="link" onClick={() => mutate({})}>
        Remove
      </Button>
    </>
  );
};

const UserSearchTable: React.FC<{
  users: UserSearchResult[];
  projectId: number;
}> = ({ users, projectId }) => {
  const { data: projectUsers } = useProjectUsers(projectId);

  const userInProject = (username: string) => {
    return (projectUsers || []).some((user) => user.username === username);
  };

  if (!users.length)
    return (
      <SectionMessage type="warn">
        No users matching your query could be found.
      </SectionMessage>
    );

  return (
    <table className="o-fixed-header-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th className={styles['add-remove-column']}></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.username}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td className={styles['add-remove-column']}>
              {userInProject(user.username) ? (
                <RemoveUser projectId={projectId} username={user.username} />
              ) : (
                <AddUserButton username={user.username} projectId={projectId} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AddUserModal: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    setField('last_name');
    setQuery('');
  };

  const [field, setField] = useState<FieldValue>('last_name');
  const [query, setQuery] = useState('');
  const { data, isFetching, refetch } = useUserLookup(projectId, query, field);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Button onClick={() => toggle()}>+ Add Users</Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="lg"
        className={`${styles['root']} modal-dialog-centered`}
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          <span>Add Users</span>
        </ModalHeader>
        <ModalBody className={styles['body']}>
          <h3 style={{ marginBottom: '10px' }}>Search for User</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Radio labels for selecting lastname/email/username for search */}
            <div className={stylesUserList['radio-group']}>
              <input
                name="adduser-field"
                id="adduser-radio-lastname"
                type="radio"
                value="last_name"
                onChange={(e) => setField(e.target.value as FieldValue)}
                checked={field === 'last_name'}
              />
              <label htmlFor="adduser-radio-lastname">Last Name</label>

              <input
                name="adduser-field"
                id="adduser-radio-email"
                type="radio"
                value="email"
                onChange={(e) => setField(e.target.value as FieldValue)}
                checked={field === 'email'}
              />
              <label htmlFor="adduser-radio-email">Email</label>

              <input
                name="adduser-field"
                id="adduser-radio-username"
                type="radio"
                value="username"
                onChange={(e) => setField(e.target.value as FieldValue)}
                checked={field === 'username'}
              />
              <label htmlFor="adduser-radio-username">Username</label>
            </div>
            {/* Search bar input group */}
            <div className="input-group">
              <div className="input-group-prepend">
                <Button
                  className={stylesUserList['search-button']}
                  type="secondary"
                  iconNameBefore="search"
                  attr="submit"
                  isLoading={isFetching}
                >
                  Search
                </Button>
              </div>
              <Input
                style={{ fontSize: '1em' }}
                id="add-user"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <label
              className={stylesUserList['search-input-label']}
              htmlFor="add-user"
            >
              <i>Enter their exact name, email address, or username.</i>
            </label>
          </form>
          {/* Search result table */}
          {data && (
            <SectionTableWrapper
              className={styles['table-wrap']}
              contentShouldScroll
            >
              <UserSearchTable
                users={data}
                projectId={projectId}
              ></UserSearchTable>
            </SectionTableWrapper>
          )}
        </ModalBody>
        <ModalFooter />
      </Modal>
    </>
  );
};

export default AddUserModal;
