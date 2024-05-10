import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../..';
import styles from './Navbar.module.css';

type sizes = 'xs' | 'sm' | 'md' | 'lg';

export const NavItem: React.FC<
  React.PropsWithChildren<{
    to: string;
    icon?: string;
    end?: boolean;
    className?: string;
  }>
> = ({ to, icon, end, className, children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [iconSize, setIconSize] = useState('xs');

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWindowWidth();

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 768) {
      setIconSize('xs');
    } else {
      setIconSize('md');
    }
  }, [windowWidth]);

  return (
    <NavLink to={to} end={end} className={`${styles['nav-link']} ${className}`}>
      {({ isActive }) => (
        <div
          className={`${styles['nav-content']} ${
            isActive ? styles['nav-active'] : ''
          }`}
        >
          {icon && (
            <Icon
              name={icon}
              size={iconSize as sizes}
              className={styles['nav-icon']}
            />
          )}
          {/* we'll want to set name based on the app */}
          <span className={styles['nav-text']}>{children}</span>
        </div>
      )}
    </NavLink>
  );
};

export const AnchorNavItem: React.FC<
  React.PropsWithChildren<{
    to: string;
    icon?: string;
    end?: boolean;
    className?: string;
  }>
> = ({ to, icon, end, className, children }) => (
  <a href={to} className={`${styles['nav-link']} ${className}`}>
    <div className={styles['nav-content']}>
      {icon && <Icon name={icon} size="xs" className={styles['nav-icon']} />}
      {/* we'll want to set name based on the app */}
      <span className={styles['nav-text']}>{children}</span>
    </div>
  </a>
);

// Alternate nav item with active state set by a prop
export const QueryNavItem: React.FC<
  React.PropsWithChildren<{
    to: string;
    icon?: string;
    end?: boolean;
    active: boolean;
    className?: string;
  }>
> = ({ to, icon, end, className, active, children }) => {
  return (
    <NavLink to={to} end={end} className={`${styles['nav-link']} ${className}`}>
      <div
        className={`${styles['nav-content']} ${
          active ? styles['nav-active'] : ''
        }`}
      >
        {icon && <Icon name={icon} size="xs" className={styles['nav-icon']} />}
        {/* we'll want to set name based on the app */}
        <span className={styles['nav-text']}>{children}</span>
      </div>
    </NavLink>
  );
};

type NavbarProps = React.PropsWithChildren<unknown>;

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Navbar;
