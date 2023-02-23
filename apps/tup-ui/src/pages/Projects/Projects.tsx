import React from 'react';
import {
  PageLayout,
  RequireAuth,
  ProjectsNavbar,
  ProjectsListing,
} from '@tacc/tup-components';
import { SectionHeader } from '@tacc/core-components';

import styles from './Projects.module.css';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <section className={styles['project-section']}>
        <PageLayout
          top={<SectionHeader>Projects & Allocations</SectionHeader>}
          left={<ProjectsNavbar />}
          right={<ProjectsListing />}
        ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default Layout;
