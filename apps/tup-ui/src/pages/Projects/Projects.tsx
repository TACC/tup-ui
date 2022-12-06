import React from 'react';
import { ProjectsLayout, RequireAuth } from '@tacc/tup-components';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <ProjectsLayout />
    </RequireAuth>
  );
};

export default Layout;
