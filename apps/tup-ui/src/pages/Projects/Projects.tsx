import React from 'react';
import {
  PageLayout,
  RequireAuth,
  ProjectsNavbar,
  ProjectsListing,
} from '@tacc/tup-components';
import styles from './Projects.module.css';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <PageLayout
        top={
          <div className={styles['project-header']}>Projects & Allocations</div>
        }
        left={<ProjectsNavbar />}
        right={<ProjectsListing />}
      ></PageLayout>
    </RequireAuth>
  );
};

export default Layout;
