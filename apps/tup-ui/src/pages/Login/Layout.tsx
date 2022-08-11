import React from 'react';
import { LoginComponent } from '../../components/auth';

import './Layout.global.css';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.root}>
      <LoginComponent className={styles.body} />
      <div className={styles.footer}>
        <a className={styles.link} href="./security">
          Security
        </a>
        <a className={styles.link} href="./policies">
          Policies
        </a>
      </div>
    </div>
  );
};

export default Layout;
