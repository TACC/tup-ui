import React from 'react';
import { Navbar, NavItem } from '@tacc/core-wrappers';
import { useAuth } from '@tacc/tup-hooks';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { loggedIn } = useAuth();
  return (
    <div className={styles['root']}>
      <Navbar>
        <NavItem end icon="dashboard" to={'/'}>
          Dashboard
        </NavItem>
        <NavItem icon="allocations" to={'/projects'}>Projects & Allocations</NavItem>
        <NavItem icon="multiple-coversation" to={'/tickets'}>Tickets</NavItem>
        {loggedIn && <NavItem icon="exit" to={'/logout'}>Log Out</NavItem>}
      </Navbar>
    </div>
  );
};

export default Sidebar;
