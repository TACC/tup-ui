import React from 'react';
import { Navbar, NavItem } from '@tacc/core-wrappers';
import { useAuth } from '@tacc/tup-hooks';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { loggedIn } = useAuth();
  return (
    <div className={styles['root']}>
      <Navbar>
        <NavItem to={'/'}>Dashboard</NavItem>
        <NavItem to={'/projects'}>Projects & Allocations</NavItem>
        {loggedIn && <NavItem to={'/logout'}>Log Out</NavItem>}
      </Navbar>
    </div>
  );
};

export default Sidebar;
