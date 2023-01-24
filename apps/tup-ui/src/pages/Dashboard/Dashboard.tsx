import React, { useEffect } from 'react';
import {
  ProfileComponent,
  RequireAuth,
  SystemMonitor,
  ProjectsDashboard,
  TicketsDashboard,
} from '@tacc/tup-components';
import { Outlet } from 'react-router-dom';

import './Dashboard.css';
import styles from './Dashboard.module.css';

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
      <section className="c-page">
        <header>
          <h1>Dashboard</h1>
          <a href="https://example.com" target="_blank" rel="noreferrer">Manage Account (needs real link)</a>
        </header>
        <main className={styles.panels}>
          <ProfileComponent />
          <SystemMonitor />
          <ProjectsDashboard />
          <TicketsDashboard />
          <Outlet />
        </main>
      </section>
    </RequireAuth>
  );
};

export default Layout;
