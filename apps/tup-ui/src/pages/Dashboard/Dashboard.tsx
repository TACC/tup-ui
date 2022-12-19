import React from 'react';
import { Section } from '@tacc/core-components';
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
  return (
    <RequireAuth>
      <Section
        header="Dashboard"
        bodyClassName="dashboard"
        contentClassName={styles.panels}
        content={
          <>
            <ProfileComponent />
            <SystemMonitor />
            <ProjectsDashboard />
            <TicketsDashboard />
            <Outlet />
          </>
        }
      />
    </RequireAuth>
  );
};

export default Layout;
