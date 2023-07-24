import React, { useState } from 'react';
import { useMfaPairSms } from '@tacc/tup-hooks';
import { Button } from '@tacc/core-components';
import { FieldWrapper } from '@tacc/core-wrappers';
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
    <form onSubmit={(e) => onSubmit(e)} className={styles['mfa-form']}>
      <FieldWrapper
        name="mfa-phone-number"
        label="Enter your Phone Number:"
        error={
          smsMutation.isError && (
            <>
              Unable to pair via SMS. If this error persists,{' '}
              <TicketCreateModal display="link">
                submit a ticket
              </TicketCreateModal>
              .
            </>
          )
        }
      >
        <input
          required
          id="mfa-phone-number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FieldWrapper>
      <Button type="primary" attr="submit" isLoading={smsMutation.isLoading}>
        Send Token
      </Button>
    </form>
  );
};

export default MfaSmsPanel;
