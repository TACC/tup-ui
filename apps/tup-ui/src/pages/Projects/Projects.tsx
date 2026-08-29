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
  <Button
    as="a"
    href="https://submit-tacc.xras.org/"
    target="_blank"
    rel="noreferrer"
    type="primary"
    size="small"
  >
    + New Project
  </Button>
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
