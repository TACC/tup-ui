import React from 'react';
import {
  ProfileComponent,
  RequireAuth,
  SystemMonitor,
  ProjectsDashboard,
  TicketsDashboard,
} from '@tacc/tup-components';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <div>
        <ProfileComponent />
        <SystemMonitor />
        <ProjectsDashboard />
        <TicketsDashboard />
        <Outlet />
      </div>
    </RequireAuth>
  );
};

export default Layout;
