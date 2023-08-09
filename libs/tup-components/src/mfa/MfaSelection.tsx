import React from 'react';
import { Button } from '@tacc/core-components';
import styles from './Mfa.module.css';
import { Link } from 'react-router-dom';

const MfaSelector: React.FC = () => {
  return (
    <div className={styles['mfa-type-container']}>
      Select whether you want to use an MFA token app or SMS texting for
      authenticating to your TACC account.
      <div className={styles['mfa-type-selection']}>
        <Link to="pair/totp">
          <Button type="secondary">Token App</Button>
        </Link>
        <Link to="pair/sms">
          <Button type="secondary">SMS Text</Button>
        </Link>
      </div>
    </div>
  );
};

export default MfaSelector;
