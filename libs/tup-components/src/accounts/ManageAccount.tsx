import {
  Icon,
  Button,
  LoadingSpinner,
  InlineMessage,
} from '@tacc/core-components';
import { useMfa, useMfaDelete, useProfile } from '@tacc/tup-hooks';
import { useDelete } from '@tacc/tup-hooks/requests';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ManageAccount.module.css';

const ManageUser = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>
        Edit User Information | Change Password | Manage Distinguished Names
        (DNs)
      </strong>
    </div>
    <span className={styles['tap-description']}>
      Your user account can be managed on the TACC Account Management (TAM)
      portal.
    </span>
    <a
      href="https://accounts-dev.tacc.utexas.edu/profile"
      target="_blank"
      rel="noreferrer"
    >
      <Button className={styles['tap-button']} type="primary">
        Go to TAP
      </Button>
    </a>
  </>
);

const ManageDNs = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Distinguished Names</strong>
    </div>
    <span className={styles['tap-description']}>
      DNs are managed on the TACC Account Management (TAM) portal.
    </span>
    <a
      href="https://accounts-dev.tacc.utexas.edu/certificates"
      target="_blank"
      rel="noreferrer"
    >
      <Button className={styles['tap-button']} type="primary">
        Manage DNs
      </Button>
    </a>
  </>
);

const ManagePassword = () => (
  <>
    <div className={styles['tap-header']}>
      <strong>Password</strong>
    </div>
    <span className={styles['tap-description']}>
      Passwords are managed on the TACC Account Management (TAM) portal.
    </span>
    <a
      href="https://accounts-dev.tacc.utexas.edu/change_password"
      target="_blank"
      rel="noreferrer"
    >
      <Button className={styles['tap-button']} type="primary">
        Change Password
      </Button>
    </a>
  </>
);

const AccountMfa = () => {
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
        <Link to="/mfa">
          <Button type="primary">Pair Device</Button>
        </Link>
      )}
      {hasPairing && data.token && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <span>
            {TOKEN_TYPE[data.token.tokentype]} ({data.token.serial})
          </span>
          <MfaUnpair />
        </div>
      )}
    </>
  );
};

const MfaUnpair = () => {
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

const ManageAccount: React.FC = () => {
  const { data } = useProfile();
  return (
    <div className={styles['account-section']}>
      <div className={styles['account-header']}>
        <Icon name="user" className={styles['account-icon']} />
        <span>
          {data?.firstName} {data?.lastName}
        </span>
      </div>
      <div className={styles['account-body']}>
        <div className={styles['tap-column']}>
          <ManageUser />
          <ManagePassword />
          <span />
          <ManageDNs />
        </div>
        <div
          style={{ borderRight: '1px solid #707070', marginTop: '10px' }}
        ></div>
        <div className={styles['mfa-column']}>
          <AccountMfa />
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
