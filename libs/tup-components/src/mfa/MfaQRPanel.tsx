import React from 'react';
import { useMfaPairTotp } from '@tacc/tup-hooks';
import { Button, LoadingSpinner, SectionMessage } from '@tacc/core-components';
import { TicketCreateModal } from '../tickets';
import styles from './Mfa.module.css';

const MfaQRPanel: React.FC = () => {
  const { mutate, isLoading, data, isError } = useMfaPairTotp();
  return (
    <>
      <div>
        Open an approved{' '}
        <a
          href="https://docs.tacc.utexas.edu/basics/mfa/#mfaapps"
          target="_blank"
          rel="noreferrer"
        >
          MFA pairing app
        </a>{' '}
        and scan the following QR code:
      </div>
      <div className={styles['qr-code-box']}>
        {!data && !isLoading && (
          <Button className={styles['qr-button']} onClick={() => mutate(null)}>
            Click to Generate QR Code
          </Button>
        )}
        {!data && isLoading && <LoadingSpinner />}
        {data && <img src={data.googleurl.img} alt="Google MFA QR Code"></img>}
      </div>
      {data && data.otpkey && (
        <p className={styles['qr-code-message']}>
          Can't scan QR code? <code>{data.otpkey.value_b32}</code> &nbsp;(
          <Button
            type="link"
            onClick={() => navigator.clipboard.writeText(data.otpkey.value_b32)}
          >
            copy to clipboard
          </Button>
          )
        </p>
      )}
      {data && !data.otpkey && (
        <p className={styles['qr-code-message']}>
          Can't scan QR code?{' '}
          <TicketCreateModal display="link">submit a ticket</TicketCreateModal>.
        </p>
      )}
      {!data && isError && (
        <SectionMessage type="error" className={styles['qr-code-message']}>
          Unable to display QR code. If this error persists,{' '}
          <TicketCreateModal display="link">submit a ticket</TicketCreateModal>.
        </SectionMessage>
      )}
    </>
  );
};

export default MfaQRPanel;
