import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@tacc/core-components';
import styles from './Navbar.module.css';

export const NavItem: React.FC<
  React.PropsWithChildren<{ to: string; icon?: string; end?: boolean }>
> = ({ to, icon, end, children }) => (
  <NavLink to={to} end={end} className={styles['nav-link']}>
    {({ isActive }) => (
      <div
        className={`${styles['nav-content']} ${
          isActive ? styles['nav-active'] : ''
        }`}
      >
        {icon && <Icon name={icon} />}
        {/* we'll want to set name based on the app */}
        <span className={styles['nav-text']}>{children}</span>
      </div>
    )}
  </NavLink>
);

type NavbarProps = React.PropsWithChildren<unknown>;

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Navbar;
