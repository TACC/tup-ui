import React, { useState } from 'react';
import { useMfaValidate } from '@tacc/tup-hooks';
import { Button, SectionMessage } from '@tacc/core-components';

const MfaValidationPanel = () => {
  const [tokenValue, setTokenValue] = useState<string>('');
  const mfaValidation = useMfaValidate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mfaValidation.mutate({ password: tokenValue });
  };
  return (
    <div style={{ flex: '1 1 200px' }}>
      2. Enter the token shown in the app to continue the pairing.
      <form onSubmit={(e) => onSubmit(e)} style={{ paddingTop: '10px' }}>
        <input onChange={(e) => setTokenValue(e.target.value)}></input>
        <div style={{ paddingTop: '20px' }}>
          <Button
            type="primary"
            attr="submit"
            isLoading={mfaValidation.isLoading}
          >
            Confirm Pairing
          </Button>
        </div>
      </form>
      {mfaValidation.error && (
        <div
          style={{
            width: 'fit-content',
            height: 'fit-content',
            paddingTop: '15px',
          }}
        >
          <SectionMessage type="error" scope="section">
            Error validating MFA token: {mfaValidation.error.message}
          </SectionMessage>
        </div>
      )}
    </div>
  );
};

export default MfaValidationPanel;
