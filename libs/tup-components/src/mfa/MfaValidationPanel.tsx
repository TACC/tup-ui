import React, { useState } from 'react';
import { useMfaVerify } from '@tacc/tup-hooks';
import { Button } from '@tacc/core-components';
import { FieldWrapper } from '@tacc/core-wrappers';
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
      <form onSubmit={(e) => onSubmit(e)} className={styles['mfa-form']}>
        <FieldWrapper
          name="confirm-pairing"
          label={pairingMessage[tokenType]}
          error={error && `Error validating MFA token: "${error.message}"`}
        >
          <input
            required
            id="confirm-pairing"
            onChange={(e) => setTokenValue(e.target.value)}
          ></input>
        </FieldWrapper>
        <Button type="primary" attr="submit" isLoading={isLoading}>
          Confirm Pairing
        </Button>
      </form>
      {tokenType === 'sms' && (
        <p className={styles['mfa-message']}>
          Didn't receive a message within 5 minutes?{' '}
          <TicketCreateModal display="link">Get Help</TicketCreateModal>
        </p>
      )}
    </>
  );
};

export default MfaValidationPanel;
