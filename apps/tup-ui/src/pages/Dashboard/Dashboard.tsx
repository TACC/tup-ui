import React, { useEffect } from 'react';
import { SectionHeader, SectionMessage } from '@tacc/core-components';
import {
  RequireAuth,
  SystemMonitor,
  ProjectsDashboard,
  TicketsDashboard,
  UserNews,
} from '@tacc/tup-components';

import './Dashboard.css';
import styles from './Dashboard.module.css';
import { Outlet } from 'react-router-dom';

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
        <SectionMessage
          className={styles['mfa-banner']}
          type="warning"
          canDismiss
        >
          The portal will require Multi-Factor Authentication (MFA) beginning{' '}
          <strong>August 18, 2026</strong>. Please{' '}
          <a
            href="https://docs.tacc.utexas.edu/basics/mfa/"
            target="_blank"
            rel="noopener"
          >
            set up your MFA
          </a>{' '}
          to avoid disruption in access.
        </SectionMessage>
        <SectionHeader className={styles['dashboard-title']}>
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
        <Outlet />
      </section>
    </RequireAuth>
  );
};

export default Layout;
