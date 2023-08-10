import React from 'react';
import MfaQRPanel from './MfaQRPanel';
import MfaSmsPanel from './MfaSmsPanel';
import MfaValidationPanel from './MfaValidationPanel';
import styles from './Mfa.module.css';

const MfaPairingLayout: React.FC<{ method: 'sms' | 'totp' }> = ({ method }) => {
  return (
    <ol className={styles['pairing-container']}>
      <li>
        {method === 'totp' && <MfaQRPanel />}
        {method === 'sms' && <MfaSmsPanel />}
      </li>
      <li aria-hidden className={styles['pairing-separator']} />
      <li value="2">
        <MfaValidationPanel tokenType={method} />
      </li>
    </ol>
  );
};

export default MfaPairingLayout;
