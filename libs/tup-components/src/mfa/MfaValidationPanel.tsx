import React, { useState } from 'react';
import { useMfaVerify } from '@tacc/tup-hooks';
import { Button, SectionMessage } from '@tacc/core-components';
import TicketCreateModal from '../tickets/TicketCreateModal';
import styles from './Mfa.module.css';

const MfaValidationPanel: React.FC<{ tokenType: 'totp' | 'sms' }> = ({
  tokenType,
}) => {
  const [tokenValue, setTokenValue] = useState<string>('');
  const { isLoading, error, mutate } = useMfaVerify();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ password: tokenValue, type: tokenType });
  };

  const pairingMessage = {
    totp: 'Enter the token shown in the app to continue the pairing.',
    sms: 'Enter the token sent to your phone number.',
  };

  return (
    <>
      {pairingMessage[tokenType]}
      <form onSubmit={(e) => onSubmit(e)} className={styles['mfa-form']}>
        <label htmlFor="confirm-pairing" hidden>
          Confirm Pairing
        </label>
        <input
          id="confirm-pairing"
          onChange={(e) => setTokenValue(e.target.value)}
        ></input>
        <div className={styles['submit-button']}>
          <Button type="primary" attr="submit" isLoading={isLoading}>
            Confirm Pairing
          </Button>
        </div>
      </form>
      {tokenType === 'sms' && (
        <p className={styles['qr-code-message']}>
          Didn't receive a message within 5 minutes?{' '}
          <TicketCreateModal display="link">Get Help</TicketCreateModal>
        </p>
      )}
      {error && (
        <SectionMessage
          type="error"
          scope="section"
          className={styles['qr-code-message']}
        >
          Error validating MFA token: error.message
        </SectionMessage>
      )}
    </>
  );
};

export default MfaValidationPanel;
