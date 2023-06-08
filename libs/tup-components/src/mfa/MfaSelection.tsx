import React from 'react';
import { Button } from '@tacc/core-components';
import styles from './Mfa.module.css';
import { Link, Navigate } from 'react-router-dom';
import { useMfa } from '@tacc/tup-hooks';

const MfaSelector: React.FC = () => {

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
