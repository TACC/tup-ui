import React from 'react';
import { MfaHeader, MfaWrapper, RequireAuth } from '@tacc/tup-components';
import styles from './Mfa.module.css';
import { Outlet } from 'react-router-dom';

const Mfa: React.FC<{ task: 'pair' | 'unpair' }> = ({ task }) => {
  return (
    <RequireAuth>
      <section className={styles['mfa-layout']}>
        <MfaHeader />
        {/* Default to a "success" view if user has a verified token */}
        {task === 'pair' ? (
          <MfaWrapper>
            <Outlet />
          </MfaWrapper>
        ) : (
          <Outlet />
        )}
      </section>
    </RequireAuth>
  );
};

export default Mfa;
