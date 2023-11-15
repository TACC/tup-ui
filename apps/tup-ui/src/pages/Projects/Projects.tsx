import React from 'react';
import {
  PageLayout,
  RequireAuth,
  ProjectsNavbar,
  ProjectsListing,
} from '@tacc/tup-components';
import { SectionHeader, Button } from '@tacc/core-components';
import styles from './Projects.module.css';

const NewProject = () => (
  <a href="https://submit-tacc.xras.org/" target="_blank" rel="noreferrer">
    <Button type="primary" size="small">
      + New Project
    </Button>
  </a>
);

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <section className={styles['project-section']}>
        <PageLayout
          top={
            <SectionHeader actions={<NewProject />} isNestedHeader>
              Projects & Allocations
            </SectionHeader>
          }
          left={<ProjectsNavbar />}
          right={<ProjectsListing />}
        ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default Layout;
