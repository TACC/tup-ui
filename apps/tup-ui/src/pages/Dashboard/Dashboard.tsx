import React, { useEffect } from 'react';
import { SectionHeader } from '@tacc/core-components';
import {
  RequireAuth,
  SystemMonitor,
  ProjectsDashboard,
  TicketsDashboard,
  UserNews,
} from '@tacc/tup-components';

import styles from './Dashboard.module.css';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <section className={`c-page ${styles.section}`}>
        <SectionHeader
          actions={
            <a href="https://example.com" target="_blank" rel="noreferrer">
              Manage Account (needs real link)
            </a>
          }
        >
          Dashboard
        </SectionHeader>
        <main className={styles.panels}>
          <UserNews />
          <SystemMonitor />
          <ProjectsDashboard />
          <TicketsDashboard />
        </main>
      </section>
    </RequireAuth>
  );
};

export default Layout;
