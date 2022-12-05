import React from 'react';
import { ProjectsLayout, RequireAuth } from '@tacc/tup-components';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <div>
        <ProjectsLayout />
      </div>
    </RequireAuth>
  );
};

export default Layout;
