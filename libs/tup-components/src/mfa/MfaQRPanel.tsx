import React from 'react';
import { useMfaPairTotp } from '@tacc/tup-hooks';
import { Button, LoadingSpinner, SectionMessage } from '@tacc/core-components';
import { TicketCreateModal } from '../tickets';
import styles from './Mfa.module.css';

const MfaQRPanel: React.FC = () => {
  const { mutate, isLoading, data, isError } = useMfaPairTotp();
  return (
    <div>
      <div>1. Open the app and scan the following QR code:</div>
      <div className={styles['qr-code-box']}>
        <div>
          {!data && !isLoading && (
            <Button
              className={styles['qr-button']}
              onClick={() => mutate(null)}
            >
              Click to Generate QR Code
            </Button>
          )}
          {!data && isLoading && <LoadingSpinner />}
          {data && (
            <img src={data.googleurl.img} alt="Google MFA QR Code"></img>
          )}
        </div>
      </div>
      {!data && isError && (
        <SectionMessage type="error">
          <div className={styles['qr-code-error']}>
            There was an error generating your QR code. If this error persists,
            please{' '}
            <TicketCreateModal display="link">
              submit a ticket
            </TicketCreateModal>{' '}
            and TACC User Services will assist you.
          </div>
        </SectionMessage>
      )}
    </div>
  );
};

export default MfaQRPanel;
