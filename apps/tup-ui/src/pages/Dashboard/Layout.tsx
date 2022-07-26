import React from 'react';
import { ProfileComponent } from '@tacc/tup-ui/components/profile';
import { RequireAuth } from '@tacc/tup-ui/components/utils';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <ProfileComponent />
    </RequireAuth>
  )
}

export default Layout;