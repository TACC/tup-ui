import React, { useEffect } from 'react';
import { LoginComponent } from '@tacc/tup-components';
import { Button } from '@tacc/core-components';

import './Login.global.css';
import styles from './Login.module.css';

const Layout: React.FC = () => {
  const bodyClassName = 'login';

  useEffect(() => {
    if (bodyClassName) document.body.classList.add(bodyClassName);

    return function cleanup() {
      if (bodyClassName) document.body.classList.remove(bodyClassName);
    };
  }, [bodyClassName]);

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
        {/* NOTE: No one is certain yet what this link/button should do */}
        <Button type="link" disabled>
          Policies
        </Button>
      </div>
    </div>
  );
};

export default Layout;
