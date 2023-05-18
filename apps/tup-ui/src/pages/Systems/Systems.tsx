import React from 'react';
import { PageLayout, RequireAuth, SystemNavBar } from '@tacc/tup-components';
import { SystemDetail } from '..';
import { SectionHeader, Button } from '@tacc/core-components';
import styles from './Systems.module.css';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <section className={styles['system-section']}>
        <PageLayout
          top={<SectionHeader>System Status</SectionHeader>}
          left={<SystemNavBar />}
          right={<SystemDetail />}
        ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default Layout;
