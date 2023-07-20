import React from 'react';
import { useMfaPairTotp } from '@tacc/tup-hooks';
import { Button, LoadingSpinner, SectionMessage } from '@tacc/core-components';
import { TicketCreateModal } from '../tickets';
import styles from './Mfa.module.css';

const MfaQRPanel: React.FC = () => {
  const { mutate, isLoading, data, isError } = useMfaPairTotp();

  const ticketCreateModalButton = document.getElementById('TicketCreateModal');
  const hasTicketCreateModal = Boolean( ticketCreateModalButton );
  const openTicketCreateModal = () => {
    ticketCreateModalButton?.click()
  };

  return (
    <div>
      <div>
        1. Open an approved{' '}
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
      {data && (
        <div>
          If your mobile device does not have a camera capable of scanning QR
          codes, the following text code can be used:
          <br />
          <code>{data.otpkey.value_b32}</code> &nbsp;(
          <Button
            type="link"
            onClick={() => navigator.clipboard.writeText(data.otpkey.value_b32)}
          >
            copy to clipboard
          </Button>
          )
        </div>
      )}
      {!data && isError && (
        <SectionMessage type="error">
          <div className={styles['qr-code-error']}>
            There was an error generating your QR code. If this error persists,
            please{' '}
            {hasTicketCreateModal ? (
              <Button type="link" onClick={() => openTicketCreateModal()}>submit a ticket</Button>
            ) : (
              <TicketCreateModal display="link">
                submit a ticket
              </TicketCreateModal>
            )}{' '}
            and TACC User Services will assist you.
          </div>
        </SectionMessage>
      )}
    </div>
  );
};

export default MfaQRPanel;
