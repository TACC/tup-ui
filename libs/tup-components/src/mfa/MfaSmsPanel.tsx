import React, { useState } from 'react';
import { useMfaPairSms } from '@tacc/tup-hooks';
import { Button, InlineMessage } from '@tacc/core-components';
import styles from './Mfa.module.css';
import { TicketCreateModal } from '../tickets';

const MfaSmsPanel: React.FC = () => {
  const smsMutation = useMfaPairSms();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    smsMutation.mutate({ phoneNumber });
  };
  return (
    <>
      <form
        onSubmit={(e) => onSubmit(e)}
        className={`${styles['mfa-form']} s-form`}
      >
        <div>
          <label htmlFor="mfa-phone-number">Enter your Phone Number:</label>
          <input
            required
            id="mfa-phone-number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {smsMutation.isError && (
            <InlineMessage type="error" tagName="small" className={styles['field-error']}>
              Unable to pair via SMS. If this error persists,{' '}
              <TicketCreateModal display="link">
                submit a ticket
              </TicketCreateModal>
              .
            </InlineMessage>
          )}
        </div>
        <Button type="primary" attr="submit" isLoading={smsMutation.isLoading}>
          Send Token
        </Button>
      </form>
      {(smsMutation.data || smsMutation.isLoading) && (
        <p className={styles['mfa-message']}>
          Didn't receive a message within 5 minutes?{' '}
          <TicketCreateModal display="link">Get Help</TicketCreateModal>
        </p>
      )}
    </>
  );
};

export default MfaSmsPanel;
