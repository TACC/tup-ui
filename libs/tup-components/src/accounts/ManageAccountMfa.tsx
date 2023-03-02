import { Button, LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { useMfa, useMfaDelete } from '@tacc/tup-hooks';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ManageAccount.module.css';

export const MfaUnpair: React.FC = () => {
  const [pairingState, setPairingState] = useState<'unpair' | 'confirm'>(
    'unpair'
  );
  const { isLoading, isError, mutate } = useMfaDelete();
  if (isLoading)
    return (
      <div style={{ width: 'fit-content' }}>
        <LoadingSpinner placement="inline" />
      </div>
    );

  switch (pairingState) {
    case 'unpair':
      return (
        <>
          {isError && (
            <InlineMessage type="error">
              An unexpected error has occurred.
            </InlineMessage>
          )}
          <Button onClick={() => setPairingState('confirm')} type="link">
            <strong>Unpair</strong>
          </Button>
        </>
      );
    case 'confirm':
      return (
        <div>
          <Button onClick={() => mutate()} type="link">
            <strong>Confirm Unpairing</strong>
          </Button>
          {' | '}
          <Button type="link" onClick={() => setPairingState('unpair')}>
            <strong>Cancel Unpairing</strong>
          </Button>
        </div>
      );
  }
};

export const AccountMfa: React.FC = () => {
  const TOKEN_TYPE = {
    sms: 'SMS Token',
    totp: 'TACC Token App',
  };
  const { data, isLoading } = useMfa();
  if (isLoading || !data) return <LoadingSpinner />;
  const hasPairing = data?.token?.rollout_state === 'enrolled';
  return (
    <>
      <div className={styles['tap-header']}>
        <strong>MFA Pairing</strong>
      </div>
      {!hasPairing && (
        <Link to="/mfa" className={styles['tap-href']}>
          <Button type="primary">Pair Device</Button>
        </Link>
      )}
      {hasPairing && data.token && (
        <div className={styles['mfa-options']}>
          <span>
            {TOKEN_TYPE[data.token.tokentype]} ({data.token.serial})
          </span>
          <MfaUnpair />
        </div>
      )}
    </>
  );
};
