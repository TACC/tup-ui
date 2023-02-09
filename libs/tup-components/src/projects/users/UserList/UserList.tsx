import React from 'react';
import { useProjectUsers } from '@tacc/tup-hooks';
import { NavItem } from '@tacc/core-wrappers';
import styles from './UserList.module.css';
import { LoadingSpinner } from '@tacc/core-components';
import ManageTeam from './ManageTeam';

const UserList: React.FC<{ projectId: number }> = ({ projectId }) => {
  const projectUsers = useProjectUsers(projectId);
  const data = projectUsers.data ?? [];
  const pi = data.find((user) => user.role === 'PI');
  const delegate = data.find((user) => user.role === 'Delegate');

  if (projectUsers.isLoading)
    return (
      <div className={styles['loading-placeholder']}>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={styles['user-list']}>
      <ManageTeam projectId={projectId} />
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
    </div>
  );
};

export default UserList;
