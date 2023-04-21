import React from 'react';
import { LoginComponent } from '@tacc/tup-components';
import { Button } from '@tacc/core-components';

import styles from './Login.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.root}>
      <LoginComponent className={styles.body} />
      <div className={styles.footer}>
        <a
          className={styles.footer__link}
          href="/about/security-and-compliance/"
        >
          Security
        </a>
        <a className={styles.footer__link} href="/about/user-policies/">
          Policies
        </a>
      </div>
    </div>
  );
};

export default Layout;
