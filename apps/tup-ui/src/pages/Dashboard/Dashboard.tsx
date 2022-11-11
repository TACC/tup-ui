import React from 'react';
//import { ProfileComponent } from '../../components/profile';
//import { RequireAuth } from '../../components/utils';
//import SystemMonitor from '../../components/sysmon';
import {
  ProfileComponent,
  RequireAuth,
  SystemMonitor,
  ProjectsDashboard,
} from '@tacc/tup-components';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <div>
        <ProfileComponent />
        <SystemMonitor />
        <ProjectsDashboard />
      </div>
    </RequireAuth>
  );
};

export default Layout;
