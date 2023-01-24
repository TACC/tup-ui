import React, { useState } from 'react';
import { useMfa } from '@tacc/tup-hooks';
import { Button, LoadingSpinner } from '@tacc/core-components';
import MfaSuccessView from './MfaSuccessView';
import MfaHeader from './MfaHeader';
import MfaQRPanel from './MfaQRPanel';
import MfaSmsPanel from './MfaSmsPanel';
import MfaValidationPanel from './MfaValidationPanel';
import styles from './Mfa.module.css';

const MfaPairingLayout: React.FC<{ method: 'sms' | 'totp' }> = ({ method }) => {
  return (
    <>
      <MfaHeader />
      <div className={styles['pairing-container']}>
        {method === 'totp' && <MfaQRPanel />}
        {method === 'sms' && <MfaSmsPanel />}
        <div className={styles['pairing-separator']} />
        <MfaValidationPanel tokenType={method} />
      </div>
    </>
  );
};

const MfaView = () => {
  const [mfaType, setMfaType] = useState<'SELECT' | 'SMS' | 'TOTP'>('SELECT');
  const { isLoading, data } = useMfa();

  if (isLoading) return <LoadingSpinner />;
  if (data?.token?.rollout_state === 'enrolled') return <MfaSuccessView />;

  switch (mfaType) {
    case 'SELECT':
      return (
        <>
          <MfaHeader />
          <div className={styles['mfa-type-container']}>
            Select whether you want to use an MFA token app or SMS texting for
            authenticating to your TACC account.
            <div className={styles['mfa-type-selection']}>
              <Button onClick={() => setMfaType('TOTP')} type="secondary">
                Token App
              </Button>
              <Button onClick={() => setMfaType('SMS')} type="secondary">
                SMS Text
              </Button>
            </div>
          </div>
        </>
      );
    case 'SMS':
      return <MfaPairingLayout method="sms" />;
    case 'TOTP':
      return <MfaPairingLayout method="totp" />;
  }
};

export default MfaView;
