import React from 'react';
import { useMfaPairTotp } from '@tacc/tup-hooks';
import {
  Button,
  FieldWrapper,
  LoadingSpinner,
  TextCopyModal,
} from '@tacc/core-components';
import { TicketCreateModal } from '../tickets';
import styles from './Mfa.module.css';

const MfaQRPanel: React.FC = () => {
  const { mutate, isLoading, data, isError } = useMfaPairTotp();

  const TextCopyModalHint = () => (
    <>
      Enter this code into an approved{' '}
      <a
        href="https://docs.tacc.utexas.edu/basics/mfa/#mfaapps"
        target="_blank"
        rel="noreferrer"
      >
        MFA pairing app
      </a>
      .
    </>
  )

  return (
    <>
      <form className={styles['mfa-form']}>
        <FieldWrapper
          name="mfa-phone-number"
          label={
            <>
              Open an approved{' '}
              <a
                href="https://docs.tacc.utexas.edu/basics/mfa/#mfaapps"
                target="_blank"
                rel="noreferrer"
              >
                MFA pairing app
              </a>{' '}
              and scan the following QR code:
            </>
          }
          error={
            !data &&
            isError && (
              <>
                Unable to display QR code. If this error persists,{' '}
                <TicketCreateModal display="link">
                  submit a ticket
                </TicketCreateModal>
                .
              </>
            )
          }
        >
          <div className={styles['qr-code-box']}>
            {!data && !isLoading && (
              <Button
                id=""
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
        </FieldWrapper>
      </form>
      {data && data.otpkey && (
        <p className={styles['mfa-message']}>
          Can't scan QR code?{' '}
          <TextCopyModal
            display="link"
            title="Alternative Verification Code"
            text={data.otpkey.value_b32}
            hint={<TextCopyModalHint />}
          >
            View alternative verification code.
          </TextCopyModal>
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
