import React from 'react';
import { MfaHeader, RequireAuth } from '@tacc/tup-components';
import styles from './Mfa.module.css';
import { Outlet } from 'react-router-dom';

const Mfa: React.FC = () => {
  return (
    <RequireAuth>
      <section className={styles['mfa-layout']}>
        <MfaHeader />
        <Outlet />
      </section>
    </RequireAuth>
  );
};

export default Mfa;
