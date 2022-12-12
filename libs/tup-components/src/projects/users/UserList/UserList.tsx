import React from 'react';
import { useProjectUsers } from '@tacc/tup-hooks';
import { Navbar, NavItem } from '@tacc/core-wrappers';

const UserList: React.FC<{ projectId: number }> = ({ projectId }) => {
  const projectUsers = useProjectUsers(projectId);
  const data = projectUsers.data ?? [];
  const pi = data.find((user) => user.role === 'PI');
  const delegate = data.find((user) => user.role === 'Delegate');

  return (
    <Navbar>
      <div style={{ borderBottom: '1px solid black' }}>
        {pi && (
          <NavItem to={`/projects/${projectId}/${pi?.username}`} end>
            PI: {pi.firstName} {pi.lastName}
          </NavItem>
        )}
        {delegate && (
          <NavItem to={`/projects/${projectId}/${delegate?.username}`} end>
            Delegate: {delegate?.firstName} {delegate?.lastName}
          </NavItem>
        )}
      </div>
      {data.map((user) => (
        <NavItem
          to={`/projects/${projectId}/${user.username}`}
          end
          key={user.username}
        >
          {user.firstName} {user.lastName}
        </NavItem>
      ))}
    </Navbar>
  );
};

export default UserList;
