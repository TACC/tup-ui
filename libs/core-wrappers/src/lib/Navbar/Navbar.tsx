import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@tacc/core-components';
import styles from './Navbar.module.css';

export const NavItem: React.FC<
  React.PropsWithChildren<{ to: string; icon?: string }>
> = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={styles['nav-link']}
    activeClassName={styles['active']}
    exact={to === '/'}
  >
    <div className={styles['nav-content']}>
      {icon && <Icon name={icon} />}
      {/* we'll want to set name based on the app */}
      <span className={styles['nav-text']}>{children}</span>
    </div>
  </NavLink>
);

type NavbarProps = React.PropsWithChildren<unknown>;

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return <div className={`${styles['nav-list']}`}>{children}</div>;
};

export default Navbar;
