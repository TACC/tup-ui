import React, { useState } from 'react';
import { useMfa } from '@tacc/tup-hooks';
import { Button, LoadingSpinner } from '@tacc/core-components';
import styles from './Mfa.module.css';

import MfaSuccessView from './MfaSuccessView';
import MfaHeader from './MfaHeader';
import MfaQRPanel from './MfaQRPanel';
import MfaSmsPanel from './MfaSmsPanel';
import MfaValidationPanel from './MfaValidationPanel';

const MfaPairingLayout: React.FC<{ method: 'SMS' | 'TOTP' }> = ({ method }) => {
  const mfaQuery = useMfa();

  if (mfaQuery.isLoading)
    return (
      <div style={{ width: '100%' }}>
        <LoadingSpinner />
      </div>
    );
  if (mfaQuery.data && mfaQuery.data.count > 0)
    return (
      <div style={{ padding: '15px' }}>
        <MfaSuccessView />
      </div>
    );
  return (
    <div style={{ padding: '15px' }} className={styles['totplayout']}>
      <MfaHeader />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '20px',
          gap: '20px',
        }}
      >
        {method === 'TOTP' && <MfaQRPanel />}
        {method === 'SMS' && <MfaSmsPanel />}
        <div style={{ borderLeft: '2px solid #D8D8D8' }} />
        <MfaValidationPanel />
      </div>
    </div>
  );
};

const MfaView = () => {
  const [mfaType, setMfaType] = useState<'SELECT' | 'SMS' | 'TOTP'>('SELECT');

  switch (mfaType) {
    case 'SELECT':
      return (
        <div style={{ padding: '15px' }}>
          <MfaHeader />
          <div style={{ paddingTop: '15px' }}>
            Select whether you want to use an MFA token app or SMS texting for
            authenticating to your TACC account.
            <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
              <Button onClick={() => setMfaType('TOTP')} type="secondary">
                Token App
              </Button>
              <Button onClick={() => setMfaType('SMS')} type="secondary">
                SMS Text
              </Button>
            </div>
          </div>
        </div>
      );
    case 'SMS':
      return <MfaPairingLayout method="SMS" />;
    case 'TOTP':
      return <MfaPairingLayout method="TOTP" />;
  }
};

export default MfaView;
