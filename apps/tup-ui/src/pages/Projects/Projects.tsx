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
              {import.meta.env.VITE_FEATURE_PROJECTS_ENABLED !== 'true' && (
                <SectionMessage
                  type="error"
                  className={styles['banner-message']}
                >
                  Project Maintenance is scheduled for{' '}
                  <time>Tues Nov 4, 9AM - 1PM CT</time>. You will be unable to
                  manage your project users during this time. See{' '}
                  <a
                    href="https://tacc.utexas.edu/news/user-updates/107601/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    tacc.utexas.edu/news/user-updates/107601
                  </a>
                  .
                </SectionMessage>
              )}
              <SectionHeader actions={<NewProject />} isNestedHeader>
                Projects & Allocations
              </SectionHeader>
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
