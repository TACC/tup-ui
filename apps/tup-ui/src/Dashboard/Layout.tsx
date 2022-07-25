import React from 'react';
import { ProfileComponent } from '../components/profile';
import { RequireAuth } from '../components/utils';

const Layout: React.FC = () => {
  return (
    <RequireAuth>
      <ProfileComponent />
    </RequireAuth>
  )
}

export default Layout;