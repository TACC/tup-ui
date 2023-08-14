import React, { useState } from 'react';
import { useMfaVerify } from '@tacc/tup-hooks';
import { Button, InlineMessage } from '@tacc/core-components';
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
    totp: 'Enter the token shown in the app.',
    sms: 'Enter the token sent to your phone number.',
  };

  return (
    <>
      <form
        onSubmit={(e) => onSubmit(e)}
        className={`${styles['mfa-form']} s-form`}
      >
        <div>
          <label htmlFor="confirm-pairing">{pairingMessage[tokenType]}</label>
          <input
            required
            id="confirm-pairing"
            onChange={(e) => setTokenValue(e.target.value)}
          />
          {error && (
            <InlineMessage type="error" tagName="small" className={styles['field-error']}>
              Error validating MFA token: "{error.message}"
            </InlineMessage>
          )}
        </div>
        <Button type="primary" attr="submit" isLoading={isLoading}>
          Confirm Pairing
        </Button>
      </form>
    </>
  );
};

export default MfaValidationPanel;
