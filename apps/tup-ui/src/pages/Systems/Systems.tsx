import React from 'react';
import { PageLayout, RequireAuth, SystemNavBar } from '@tacc/tup-components';
import { SystemDetail } from '..';
import { SectionHeader, Button } from '@tacc/core-components';
import styles from './Systems.module.css';

const ViewMonitor = () => (
  <a href="/portal/system_monitor">
    <Button type="primary">View All Systems</Button>
  </a>
);
const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <section className={styles['system-section']}>
        <PageLayout
          top={
            <SectionHeader actions={<ViewMonitor />}>
              System Status
            </SectionHeader>
          }
          left={<SystemNavBar />}
          right={<SystemDetail />}
        ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default Layout;
