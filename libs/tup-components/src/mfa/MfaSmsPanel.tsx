import React, { useState } from 'react';
import { useMfaPairSms } from '@tacc/tup-hooks';
import { Button } from '@tacc/core-components';
import styles from './Mfa.module.css';

const MfaSmsPanel: React.FC = () => {
  const smsMutation = useMfaPairSms();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    smsMutation.mutate({ phoneNumber });
  };
  return (
    <div>
      <span>1. Enter your phone number:</span>
      <form onSubmit={(e) => onSubmit(e)} className={styles['mfa-form']}>
        <label htmlFor="mfa-phone-number" hidden>
          Enter your Phone Number:
        </label>
        <input
          id="mfa-phone-number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className={styles['submit-button']}>
          <Button
            type="primary"
            attr="submit"
            isLoading={smsMutation.isLoading}
          >
            Send Token
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MfaSmsPanel;
