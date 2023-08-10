import React from 'react';
import { Button, SectionMessage } from '@tacc/core-components';
import { useNavigate } from 'react-router-dom';
import styles from './Mfa.module.css';

const MfaSuccessView: React.FC<{ task: 'pair' | 'unpair' }> = ({ task }) => {
  const navigate = useNavigate();
  return (
    <div className={styles['mfa-success-container']}>
      <SectionMessage type="success" scope="section">
        {task === 'pair' && 'Pairing successful'}
        {task === 'unpair' && 'Unpairing successful'}
      </SectionMessage>
      <Button type="primary" onClick={() => navigate('/')}>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default MfaSuccessView;
