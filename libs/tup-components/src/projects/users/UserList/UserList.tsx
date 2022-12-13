import React from 'react';
import { useProjectUsers } from '@tacc/tup-hooks';
import { Navbar, NavItem } from '@tacc/core-wrappers';
import styles from './UserList.module.css';

const UserList: React.FC<{ projectId: number }> = ({ projectId }) => {
  const projectUsers = useProjectUsers(projectId);
  const data = projectUsers.data ?? [];
  const pi = data.find((user) => user.role === 'PI');
  const delegate = data.find((user) => user.role === 'Delegate');

  return (
    <Navbar>
      {pi && (
        <NavItem
          to={`/projects/${projectId}/${pi?.username}`}
          end
          className={styles['user-navitem']}
        >
          PI: {pi.firstName} {pi.lastName} ({pi.username})
        </NavItem>
      )}
      {delegate && (
        <NavItem
          to={`/projects/${projectId}/${delegate?.username}`}
          end
          className={styles['user-navitem']}
        >
          Delegate: {delegate?.firstName} {delegate?.lastName} (
          {delegate.username})
        </NavItem>
      )}
      <div className={styles['separator']}></div>
      {data.map((user) => (
        <NavItem
          to={`/projects/${projectId}/${user.username}`}
          end
          className={styles['user-navitem']}
          key={user.username}
        >
          {user.firstName} {user.lastName} ({user.username})
        </NavItem>
      ))}
    </Navbar>
  );
};

export default UserList;
