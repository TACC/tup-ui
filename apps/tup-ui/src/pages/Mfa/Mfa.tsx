import React from 'react';
import { MfaHeader, MfaWrapper, RequireAuth } from '@tacc/tup-components';
import styles from './Mfa.module.css';
import { Outlet } from 'react-router-dom';

const Mfa: React.FC = () => {
  return (
    <RequireAuth>
      <div className={styles['mfa-layout']}>
        <MfaHeader />
        {/* Default to a "success" view if user has a verified token */}
        <MfaWrapper>
          <Outlet />
        </MfaWrapper>
      </div>
    </RequireAuth>
  );
};

export default Mfa;
