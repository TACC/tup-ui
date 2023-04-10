import {
  Button,
  LoadingSpinner,
  InlineMessage,
  SectionMessage,
} from '@tacc/core-components';
import {
  MfaTokenResponse,
  useMfa,
  useMfaDelete,
  useMfaChallenge,
} from '@tacc/tup-hooks';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TicketCreateModal } from '../tickets';
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
  const { mutate, isError } = useMfaDelete();
  const { mutate: sendChallenge } = useMfaChallenge();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentToken('');
    console.log('form submitted');
    mutate({
      otpcode: currentToken,
    });
  };
  return (
    <>
      <Button type="link" onClick={() => toggle()}>
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
          <span>Unpair Muli-Factor Authentication</span>
        </ModalHeader>
        <form onSubmit={(e) => submit(e)}>
          <ModalBody>
            <SectionMessage type="warning">
              You are about to remove multifactor authentication from your
              account.
            </SectionMessage>
            <br />
            <p>Enter your current MFA token to unpair your device.</p>
            {pairing.token?.tokentype === 'sms' && (
              <p>
                <Button type="primary" onClick={() => sendChallenge(null)}>
                  Send SMS Token
                </Button>
              </p>
            )}
            <p>
              <label htmlFor="current-mfa-token">Enter MFA Token:&nbsp;</label>
              <br />
              <input
                value={currentToken}
                onChange={(e) => setCurrentToken(e.target.value)}
                id="current-mfa-token"
              />
            </p>

            {isError && (
              <p>
                <SectionMessage type="error">
                  There was an error verifying your MFA token.
                </SectionMessage>
              </p>
            )}

            <p>
              If you do not have access to the device you used for the initial
              pairing, please{' '}
              <TicketCreateModal display="link">
                submit a ticket
              </TicketCreateModal>
              .
            </p>
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

export const AccountMfa: React.FC = () => {
  const TOKEN_TYPE = {
    sms: 'SMS Token',
    totp: 'TACC Token App',
  };
  const { data, isLoading } = useMfa();
  if (isLoading || !data) return <LoadingSpinner />;
  const hasPairing = data?.token?.rollout_state === 'enrolled';
  return (
    <>
      <div className={styles['tap-header']}>
        <strong>MFA Pairing</strong>
      </div>
      {!hasPairing && (
        <Link to="/mfa" className={styles['tap-href']}>
          <Button type="primary">Pair Device</Button>
        </Link>
      )}
      {hasPairing && data.token && (
        <div className={styles['mfa-options']}>
          <span>
            {TOKEN_TYPE[data.token.tokentype]} ({data.token.serial})
          </span>
          <MfaUnpair pairing={data} />
        </div>
      )}
    </>
  );
};
