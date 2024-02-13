import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useConfig, useMfa, useProfile } from '@tacc/tup-hooks';
import {
  Button,
  InlineMessage,
  LoadingSpinner,
  SectionMessage,
} from '@tacc/core-components';
import {
  useMfaDelete,
  useMfaChallenge,
  useMfaEmailUnpair,
} from '@tacc/tup-hooks';
import TicketCreateModal from '../tickets/TicketCreateModal';
import styles from './Mfa.module.css';

const MfaUnpairingView: React.FC = () => {
  const { search } = useLocation();
  const { data: profileData } = useProfile();
  const unpairCode = new URLSearchParams(search).get('code');
  const [currentToken, setCurrentToken] = useState('');
  const { data, isLoading } = useMfa();
  const { mutate: unpairWithCode, isError, isSuccess } = useMfaDelete();
  const { mutate: unpairWithEmail, isSuccess: emailSentSuccess } =
    useMfaEmailUnpair();
  const {
    mutate: sendChallenge,
    isSuccess: sendChallengeSuccess,
    isLoading: isChallengeLoading,
  } = useMfaChallenge();

  const method = data?.token?.tokentype;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentToken('');

    unpairWithCode({
      otpcode: currentToken,
    });
  };
  const { baseUrl } = useConfig();

  if (unpairCode && profileData?.username)
    return (
      <>
        <SectionMessage type="warning">
          You are about to remove multifactor authentication from your account.
        </SectionMessage>
        <p className={styles['mfa-form']}>
          {' '}
          You are seeing this page because of a request we have received to
          remove your multifactor authentication credential.
        </p>
        <p>
          <a
            href={`${baseUrl}/mfa/unpair/${profileData.username}/${unpairCode}`}
          >
            Click here to confirm removal of your MFA credential.
          </a>
        </p>
      </>
    );

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SectionMessage type="warning">
        You are about to remove multifactor authentication from your account.
      </SectionMessage>
      <br />
      <ol className={styles['pairing-container']}>
        <li className={`${styles['mfa-form']}`}>
          {method === 'sms' && (
            <>
              <label>Send SMS token to your phone</label>
              <Button
                type="secondary"
                onClick={() => sendChallenge(null)}
                isLoading={isChallengeLoading}
              >
                Send Token
              </Button>
            </>
          )}
          {method === 'totp' && <label>Open the MFA token app.</label>}
        </li>
        <li aria-hidden className={styles['pairing-separator']} />
        <li value="2">
          <form
            onSubmit={(e) => submit(e)}
            className={`${styles['mfa-form']} s-form`}
          >
            <div>
              <label htmlFor="current-mfa-token">Enter MFA Token:</label>
              <input
                value={currentToken}
                autoComplete="off"
                onChange={(e) => setCurrentToken(e.target.value)}
                id="current-mfa-token"
              />
            </div>
            <Button type="primary" attr="submit" isLoading={isLoading}>
              Confirm Unpairing
            </Button>
          </form>

          {!sendChallengeSuccess && !unpairCode && (
            <p className={styles['mfa-message']}>
              Alternatively,{' '}
              <Button type="link" onClick={() => unpairWithEmail(null)}>
                unpair via email
              </Button>
              .
              {emailSentSuccess && (
                <SectionMessage type="info">
                  An email has been sent to the address listed on your account.
                  Follow its instructions to continue the unpairing.
                </SectionMessage>
              )}
            </p>
          )}

          {method === 'sms' && sendChallengeSuccess && (
            <p className={styles['mfa-message']}>
              Didn't receive a message within 5 minutes?{' '}
              <TicketCreateModal display="link">Get Help</TicketCreateModal>
            </p>
          )}

          {isError && (
            <InlineMessage type="error">
              There was an error verifying your MFA token.
            </InlineMessage>
          )}

          {isSuccess && <Navigate to="/mfa/unpair/success" />}
        </li>
      </ol>
    </>
  );
};

export default MfaUnpairingView;
