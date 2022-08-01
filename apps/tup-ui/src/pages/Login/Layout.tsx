import React from 'react';
import { LoginComponent } from '../../components/auth';

import './Layout.global.css';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.root}>
      <LoginComponent />
      <div className={styles.footer}>
        <a href="./security">Security</a>
        <a href="./policies">Policies</a>
      </div>
    </div>
  );
};

export default Layout;
