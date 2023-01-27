import React from 'react';
import { Button } from '@tacc/core-components';
import styles from './Mfa.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useMfa } from '@tacc/tup-hooks';

const MfaSelector: React.FC = () => {
  const { data } = useMfa();

  // If users have already generated a code with one method,
  // they will need to complete registration with that method.
  if (data?.token && data?.token.tokentype === 'sms') {
    return <Navigate to="/mfa/sms" replace={true} />;
  }
  if (data?.token && data?.token.tokentype === 'totp') {
    return <Navigate to="/mfa/totp" replace={true} />;
  }

  return (
    <div className={styles['mfa-type-container']}>
      Select whether you want to use an MFA token app or SMS texting for
      authenticating to your TACC account.
      <div className={styles['mfa-type-selection']}>
        <Link to="totp">
          <Button type="secondary">Token App</Button>
        </Link>
        <Link to="sms">
          <Button type="secondary">SMS Text</Button>
        </Link>
      </div>
    </div>
  );
};

export default MfaSelector;
