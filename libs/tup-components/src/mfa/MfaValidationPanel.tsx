import React, { useState } from 'react';
import { useMfaVerify } from '@tacc/tup-hooks';
import { Button, SectionMessage } from '@tacc/core-components';
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
    totp: '2. Enter the token shown in the app to continue the pairing.',
    sms: '2. Enter the token sent to your phone number.',
  };

  return (
    <div style={{ flex: '1 1 200px' }}>
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
        <span>
          If you do not receive a text message within 5 minutes, please contact
          the helpdesk by clicking "Get Help" above.
        </span>
      )}
      {error && (
        <div className={styles['verify-error-message']}>
          <SectionMessage type="error" scope="section">
            Error validating MFA token: {error.message}
          </SectionMessage>
        </div>
      )}
    </div>
  );
};

export default MfaValidationPanel;
