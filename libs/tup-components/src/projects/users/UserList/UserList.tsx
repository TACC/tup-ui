import React from 'react';
import { useProjectUsers } from '@tacc/tup-hooks';
import { NavItem } from '@tacc/core-wrappers';
import styles from './UserList.module.css';
import { LoadingSpinner } from '@tacc/core-components';
import ManageTeam from './ManageTeam';

const UserList: React.FC<{ projectId: number }> = ({ projectId }) => {
  const projectUsers = useProjectUsers(projectId);
  const data = projectUsers.data ?? [];
  data.sort((a, b) => {
    const userA = a.lastName.toUpperCase();
    const userB = b.lastName.toUpperCase();
    if (userA < userB) {
      return -1;
    }
    if (userA > userB) {
      return 1;
    }
    return 0;
  });
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
          <span style={{ fontWeight: 'normal' }}>Principal Investigator</span>
          <h4>
            {pi.lastName}
            {', '}
            <span style={{ fontWeight: 'normal' }}>{pi.firstName}</span>
          </h4>
          <span className={styles['user-navitem-username']}>
            ({pi.username})
          </span>
        </NavItem>
      )}
      {delegate && (
        <NavItem
          to={`/projects/${projectId}/${delegate?.username}`}
          end
          className={styles['user-navitem']}
        >
          <span style={{ fontWeight: 'normal' }}>Allocation Manager</span>
          <h4>
            {delegate?.lastName}
            {', '}
            <span style={{ fontWeight: 'normal' }}>{delegate?.firstName}</span>
          </h4>
          <span className={styles['user-navitem-username']}>
            ({delegate.username})
          </span>
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
          <h5>
            {user.lastName}
            {', '}
            <span style={{ fontWeight: 'normal' }}>{user.firstName}</span>
          </h5>
          <span className={styles['user-navitem-username']}>
            ({user.username})
          </span>
        </NavItem>
      ))}
    </div>
  );
};

export default UserList;
