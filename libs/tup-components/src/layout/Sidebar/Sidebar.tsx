import React from 'react';
import { Navbar, NavItem } from '@tacc/core-components';
// import { useAuth } from '@tacc/tup-hooks';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  // const { loggedIn } = useAuth();
  return (
    <div className={styles['root']}>
      <Navbar>
        <NavItem end icon="dashboard" to={'/dashboard'}>
          Dashboard
        </NavItem>
        <NavItem icon="allocations" to={'/projects'}>
          Projects & Allocations
        </NavItem>
        <NavItem icon="multiple-coversation" to={'/tickets'}>
          Tickets
        </NavItem>
        <NavItem icon="data-files" to={'/system-status'}>
          System Status
        </NavItem>
        <NavItem icon="user" to={'/account'}>
          Manage Account
        </NavItem>
      </Navbar>
    </div>
  );
};

export default Sidebar;
