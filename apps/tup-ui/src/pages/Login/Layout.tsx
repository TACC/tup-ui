import React from 'react';
import { LoginComponent } from '../../components/auth';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.root}>
      <LoginComponent />
      <div className={styles.footer}>
        <div>Security</div>
        <div>Policies</div>
      </div>
    </div>
  );
};

export default Layout;
