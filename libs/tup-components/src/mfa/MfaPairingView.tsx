import React from 'react';
import MfaQRPanel from './MfaQRPanel';
import MfaSmsPanel from './MfaSmsPanel';
import MfaValidationPanel from './MfaValidationPanel';
import styles from './Mfa.module.css';

const MfaPairingLayout: React.FC<{ method: 'sms' | 'totp' }> = ({ method }) => {
  return (
    <div className={styles['pairing-container']}>
      {method === 'totp' && <MfaQRPanel />}
      {method === 'sms' && <MfaSmsPanel />}
      <div className={styles['pairing-separator']} />
      <MfaValidationPanel tokenType={method} />
    </div>
  );
};

export default MfaPairingLayout;
