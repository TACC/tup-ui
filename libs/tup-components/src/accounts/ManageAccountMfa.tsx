import {
  Button,
  InlineMessage,
  LoadingSpinner,
  SectionMessage,
} from '@tacc/core-components';
import {
  MfaTokenResponse,
  useMfa,
  useMfaDelete,
  useMfaChallenge,
  useMfaEmailUnpair,
} from '@tacc/tup-hooks';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TicketCreateModal } from '../tickets';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ManageAccount.module.css';

const MfaUnpair: React.FC<{ pairing: MfaTokenResponse }> = ({ pairing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  const [currentToken, setCurrentToken] = useState('');
  const { mutate: unpairWithCode, isError } = useMfaDelete();
  const { mutate: unpairWithEmail, isSuccess: emailSentSuccess } =
    useMfaEmailUnpair();
  const { mutate: sendChallenge } = useMfaChallenge();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentToken('');

    unpairWithCode({
      otpcode: currentToken,
    });
  };

  const useSms = pairing.token?.tokentype === 'sms';

  return (
    <>
      <Button type="secondary" onClick={() => toggle()}>
        Unpair
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="md"
        className="modal-dialog-centered"
      >
        <ModalHeader
          toggle={toggle}
          close={closeBtn}
          className={styles['modal-header']}
        >
          <span>Unpair Multifactor Authentication</span>
        </ModalHeader>
        <form onSubmit={(e) => submit(e)}>
          <ModalBody>
            <SectionMessage type="warning">
              You are about to remove multifactor authentication from your
              account.
            </SectionMessage>
            <br />
            <ol
              className={`
              ${styles['unpairing-container']}
              ${useSms ? styles['has-sms'] : ''}
            `}
            >
              {useSms && (
                <>
                  <li>
                    <label className={`${styles['mfa-fieldwrap']}`}>
                      <Button type="link" onClick={() => sendChallenge(null)}>
                        Send SMS token.
                      </Button>
                    </label>
                  </li>
                  <li aria-hidden className={styles['unpairing-separator']} />
                </>
              )}
              <li value={useSms ? '2' : undefined}>
                <div className={`${styles['mfa-fieldwrap']}`}>
                  <label htmlFor="current-mfa-token">Enter MFA Token:</label>
                  <input
                    value={currentToken}
                    autoComplete="off"
                    onChange={(e) => setCurrentToken(e.target.value)}
                    id="current-mfa-token"
                  />
                </div>

                <p className={styles['mfa-message']}>
                  Alternatively,{' '}
                  <Button type="link" onClick={() => unpairWithEmail(null)}>
                    unpair via email
                  </Button>
                  .
                </p>

                {isError && (
                  <InlineMessage type="error">
                    There was an error verifying your MFA token.
                  </InlineMessage>
                )}
              </li>
            </ol>
            {emailSentSuccess && (
              <SectionMessage type="info">
                An email has been sent to the address listed on your account.
                Follow its instructions to continue the unpairing.
              </SectionMessage>
            )}
          </ModalBody>
          <ModalFooter>
            <Button type="primary" attr="submit">
              Confirm Unpairing
            </Button>
            <Button onClick={() => toggle()} type="secondary" attr="submit">
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

const MfaSectionHeader: React.FC = () => (
  <div className={styles['tap-header']}>
    <strong>MFA Pairing</strong>
  </div>
);

export const AccountMfa: React.FC = () => {
  const TOKEN_TYPE = {
    sms: 'SMS Token',
    totp: 'TACC Token App',
  };
  const { data, isLoading, isError } = useMfa();
  if (isError) {
    return (
      <>
        <MfaSectionHeader />
        <SectionMessage type="error">
          There was an error retrieving your multifactor authentication status.
          Your account may be in a non-valid state. If this error persists,{' '}
          <TicketCreateModal display="link">submit a ticket</TicketCreateModal>{' '}
          with this information and TACC User Services will assist you.
        </SectionMessage>
      </>
    );
  }
  if (isLoading || !data) return <LoadingSpinner />;
  const hasPairing = data?.token?.rollout_state === 'enrolled';
  return (
    <>
      <MfaSectionHeader />
      <span className={styles['tap-description']}>
        Set up multi-factor authentication using a token app or SMS.
      </span>
      {!hasPairing && (
        <Link to="/mfa" className={styles['tap-href']}>
          <Button type="primary">Pair Device</Button>
        </Link>
      )}
      {hasPairing && data.token && (
        <div className={styles['mfa-options']}>
          <p>
            {TOKEN_TYPE[data.token.tokentype]} ({data.token.serial})
          </p>
          <MfaUnpair pairing={data} />
        </div>
      )}
    </>
  );
};
