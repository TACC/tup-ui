import React from 'react';
import { QueryNavItem } from '@tacc/core-wrappers';
import { useLocation } from 'react-router-dom';
import styles from './ProjectsListing.module.css';

export const ProjectsNavbar: React.FC = () => {
  const location = useLocation();
  const show = new URLSearchParams(location.search).get('show');
  return (
    <div className={styles['projects-listing-navbar']}>
      <QueryNavItem
        icon="project"
        to="?show=active"
        active={(show ?? 'active') === 'active'}
      >
        <div>Active Projects</div>
      </QueryNavItem>
      <QueryNavItem
        icon="pending"
        to="?show=inactive"
        active={show === 'inactive'}
      >
        <div>Inactive Projects</div>
      </QueryNavItem>
      <div className={styles['project-navbar-spacer']} />
    </div>
  );
};
