import React from 'react';
import {
  PageLayout,
  RequireAuth,
  ProjectsNavbar,
  ProjectsListing,
} from '@tacc/tup-components';
import { SectionHeader } from '@tacc/core-components';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <PageLayout
        top={<SectionHeader>Projects & Allocations</SectionHeader>}
        left={<ProjectsNavbar />}
        right={<ProjectsListing />}
      ></PageLayout>
    </RequireAuth>
  );
};

export default Layout;
