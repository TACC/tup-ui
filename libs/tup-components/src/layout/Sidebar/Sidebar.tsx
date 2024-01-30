import React from 'react';
import { Navbar, NavItem } from '@tacc/core-wrappers';
// import { useAuth } from '@tacc/tup-hooks';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  // const { loggedIn } = useAuth();
  return (
    <div className={styles['root']}>
      <Navbar>
        <NavItem end icon="dashboard" to={'/dashboard'}>
          <span className='d-none d-md-inline'>
            Dashboard
          </span>
        </NavItem>
        <NavItem icon="allocations" to={'/projects'}>
          <span className="d-none d-md-inline">
            Projects & Allocations
          </span>
        </NavItem>
        <NavItem icon="multiple-coversation" to={'/tickets'}>
          <span className="d-none d-md-inline">
            Tickets
          </span>
        </NavItem>
        <NavItem icon="data-files" to={'/system-status'}>
          <span className="d-none d-md-inline">
            System Status
          </span>
        </NavItem>
        <NavItem icon="user" to={'/account'}>
          <span className="d-none d-md-inline">
            Manage Account
          </span>
        </NavItem>
      </Navbar>
    </div>
  );
};

export default Sidebar;
