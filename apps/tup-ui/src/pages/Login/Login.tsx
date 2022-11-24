import React from 'react';
import { LoginComponent } from '@tacc/tup-components';

import './Login.global.css';
import styles from './Login.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.root}>
      <LoginComponent className={styles.body} />
      <div className={styles.footer}>
        <a className={styles.footer__link} href="./security">
          Security
        </a>
        <a className={styles.footer__link} href="./policies">
          Policies
        </a>
      </div>
    </div>
  );
};

export default Layout;
