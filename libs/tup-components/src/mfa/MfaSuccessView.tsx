import React from 'react';
import { Button, SectionMessage } from '@tacc/core-components';
import { useNavigate } from 'react-router-dom';
import MfaHeader from './MfaHeader';
import styles from './Mfa.module.css';

const MfaSuccessView = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MfaHeader />
      <div className={styles['mfa-success-container']}>
        <SectionMessage type="success" scope="section">
          Pairing Successful
        </SectionMessage>
        <div className={styles['mfa-return-button']}>
          <Button type="primary" onClick={() => navigate('/')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MfaSuccessView;
