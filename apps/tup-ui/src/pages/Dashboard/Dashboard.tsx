import React, { useEffect } from 'react';
import { SectionHeader } from '@tacc/core-components';
import {
  RequireAuth,
  SystemMonitor,
  ProjectsDashboard,
  TicketsDashboard,
  UserNews,
} from '@tacc/tup-components';

import './Dashboard.css';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';

const Layout: React.FC = () => {
  const bodyClassName = 'dashboard';

  useEffect(() => {
    if (bodyClassName) document.body.classList.add(bodyClassName);

    return function cleanup() {
      if (bodyClassName) document.body.classList.remove(bodyClassName);
    };
  }, [bodyClassName]);

  return (
    <RequireAuth>
      <section className={`c-page ${styles.section}`}>
        <SectionHeader>
          Dashboard
        </SectionHeader>
        <main className={styles.panels}>
          <UserNews />
          <SystemMonitor />
          <div className={styles['project-ticket-grid']}>
            <ProjectsDashboard />
            <TicketsDashboard />
          </div>
        </main>
      </section>
    </RequireAuth>
  );
};

export default Layout;
