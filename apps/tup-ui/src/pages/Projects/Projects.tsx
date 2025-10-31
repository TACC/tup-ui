import React from 'react';
import {
  PageLayout,
  RequireAuth,
  ProjectsNavbar,
  ProjectsListing,
} from '@tacc/tup-components';
import { SectionHeader, SectionMessage, Button } from '@tacc/core-components';
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
          <>
            <SectionHeader actions={<NewProject />} isNestedHeader>
              Projects & Allocations
            </SectionHeader>
            {import.meta.env.VITE_FEATURE_PROJECTS_ENABLED &&
              <SectionMessage type="error">
                Maintenance, <time>November 4, 9AM - 1PM Central</time>: Projects & Allocations are not available.
              </SectionMessage>
            }
          </>
          }
          left={<ProjectsNavbar />}
          right={<ProjectsListing />}
        ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default Layout;
