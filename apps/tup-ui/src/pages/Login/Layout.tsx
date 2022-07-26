import React from 'react';
import { LoginComponent } from '@tacc/tup-ui/components/auth';

const Layout: React.FC = () => {
  return (
    <div>
      <LoginComponent />
      <div>
        Security
      </div>
      <div>
        Policies
      </div>
    </div>
  )
}

export default Layout;