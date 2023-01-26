import React from 'react';
import {
  RequireAuth,
  SystemMonitor,
  ProjectsDashboard,
  TicketsDashboard,
  UserNews,
} from '@tacc/tup-components';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <div>
        <UserNews />
        <SystemMonitor />
        <ProjectsDashboard />
        <TicketsDashboard />
        <Outlet />
      </div>
    </RequireAuth>
  );
};

export default Layout;
