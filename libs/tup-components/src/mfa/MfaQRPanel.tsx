import React from 'react';
import { useMfaPairTotp } from '@tacc/tup-hooks';
import {
  Button,
  InlineMessage,
  LoadingSpinner,
  TextCopyField,
} from '@tacc/core-components';
import { TicketCreateModal } from '../tickets';
import styles from './Mfa.module.css';

const MfaQRPanel: React.FC = () => {
  const { mutate, isLoading, data, isError } = useMfaPairTotp();

  return (
    <>
      <div className={`${styles['mfa-form']} s-form`}>
        <label>
          Open an approved{' '}
          <a
            href="https://docs.tacc.utexas.edu/basics/mfa/#mfaapps"
            target="_blank"
            rel="noreferrer"
          >
            MFA pairing app
          </a>{' '}
          and scan the following QR code:
        </label>
        <div className={styles['qr-code-box']}>
          {!data && !isLoading && (
            <Button onClick={() => mutate(null)}>
              Click to Generate QR Code
            </Button>
          )}
          {!data && isLoading && <LoadingSpinner />}
          {data && (
            <img
              src={data.googleurl.img}
              alt="Google MFA QR Code"
              title="Scan to use. Or read further for alternative."
            ></img>
          )}
        </div>
      </div>
      {!data && isError && (
        <InlineMessage type="error" className={styles['mfa-message']}>
          Unable to display QR code. If this error persists,{' '}
          <TicketCreateModal display="link">submit a ticket</TicketCreateModal>.
        </InlineMessage>
      )}
      {data && data.otpkey && (
        <p className={styles['mfa-message']}>
          Can't scan QR code?{' '}
          <label htmlFor="text" className={styles['qr-code-alt-label']}>
            Enter this one-time password into an MFA app:
          </label>
          <div className="s-affixed-input-wrapper s-affixed-input-wrapper--prepend s-affixed-input-wrapper--full-width">
            <TextCopyField
              id="text"
              value="data.otpkey.value_b32"
              buttonClassName="s-affixed-input-wrapper__prepend"
              firstElement="input"
            />
          </div>
        </p>
      )}
      {data && !data.otpkey && (
        <p className={styles['mfa-message']}>
          Can't scan QR code?{' '}
          <TicketCreateModal display="link">Submit a ticket.</TicketCreateModal>
        </p>
      )}
    </>
  );
};

export default MfaQRPanel;
