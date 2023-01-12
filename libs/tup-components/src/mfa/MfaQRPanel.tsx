import React, { useEffect } from 'react';
import { useMfaPairTotp } from '@tacc/tup-hooks';
import { Button, LoadingSpinner, SectionMessage } from '@tacc/core-components';

const MfaQRPanel = () => {
  const { mutate, isLoading, data, isError } = useMfaPairTotp();
  useEffect(() => mutate(null), [mutate]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>1. Open the app and scan the following QR code:</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            border: '7px solid #D8D8D8',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          {!data && isLoading && <LoadingSpinner />}
          {data && (
            <img
              style={{ width: '100%', height: '100%' }}
              src={data.googleurl.img}
              alt="Google MFA QR Code"
            ></img>
          )}
        </div>
      </div>
      {!data && isError && (
        <SectionMessage type="error">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            There was an error generating your QR code.{' '}
            <Button type="primary" onClick={() => mutate(null)}>
              Generate a new code
            </Button>
          </div>
        </SectionMessage>
      )}
    </div>
  );
};

export default MfaQRPanel;
