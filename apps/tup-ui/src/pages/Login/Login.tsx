import React from 'react';
import { LoginComponent } from '@tacc/tup-components';

const Layout: React.FC = () => {
  return (
    <div className="s-form-page">
      <LoginComponent />
      <footer>
        <a href="/about/security-and-compliance/">Security</a>
        <a href="/use-tacc/user-policies/">Policies</a>
      </footer>
    </div>
  );
};

export default Layout;
