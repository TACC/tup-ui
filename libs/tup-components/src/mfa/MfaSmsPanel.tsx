import React, { useState } from 'react';
import { useMfaPairSms } from '@tacc/tup-hooks';
import { Button } from '@tacc/core-components';

const MfaSmsPanel = () => {
  const smsMutation = useMfaPairSms();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    smsMutation.mutate({ phoneNumber });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>1. Enter your phone number:</span>
      <form onSubmit={(e) => onSubmit(e)} style={{ paddingTop: '10px' }}>
        <input onChange={(e) => setPhoneNumber(e.target.value)}></input>
        <div style={{ paddingTop: '20px' }}>
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
