import React from 'react';
import { Button, LoadingSpinner, SectionMessage } from '@tacc/core-components';
import { useMfa } from '@tacc/tup-hooks';
import { TicketCreateModal } from '../tickets';
import { Link } from 'react-router-dom';
import styles from './ManageAccount.module.css';

const MfaSectionHeader: React.FC = () => (
  <h2 className={styles['tap-header']}>MFA Pairing</h2>
);

export const AccountMfa: React.FC = () => {
  const TOKEN_TYPE = {
    sms: 'SMS Token',
    totp: 'TACC Token App',
  };
  const { data, isLoading, isError } = useMfa();
  if (isError) {
    return (
      <>
        <MfaSectionHeader />
        <SectionMessage type="error">
          There was an error retrieving your multifactor authentication status.
          Your account may be in a non-valid state. If this error persists,{' '}
          <TicketCreateModal display="link">submit a ticket</TicketCreateModal>{' '}
          with this information and TACC User Services will assist you.
        </SectionMessage>
      </>
    );
  }
  if (isLoading || !data) {
    return (
      <>
        <MfaSectionHeader />
        <LoadingSpinner />
      </>
    );
  }
  const hasPairing = data?.token?.rollout_state === 'enrolled';
  return (
    <article className={styles['tap-feature']}>
      <MfaSectionHeader />
      <p className={styles['tap-description']}>
        Set up multi-factor authentication using a token app or SMS.
      </p>
      {!hasPairing && (
        <Link to="/mfa" className={styles['tap-href']}>
          <Button type="primary">Pair Device</Button>
        </Link>
      )}
      {hasPairing && data.token && (
        <div className={styles['mfa-options']}>
          <p>
            {TOKEN_TYPE[data.token.tokentype]} ({data.token.serial})
          </p>
          <Link to="/mfa/unpair" className={styles['tap-href']}>
            <Button type="secondary">Unpair</Button>
          </Link>
        </div>
      )}
    </article>
  );
};
