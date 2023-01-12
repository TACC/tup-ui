import React from 'react';
import { Button, SectionMessage } from '@tacc/core-components';
import { useNavigate } from 'react-router-dom';
import MfaHeader from './MfaHeader';

const MfaSuccessView = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MfaHeader />
      <div
        style={{ width: 'fit-content', height: 'fit-content', padding: '15px' }}
      >
        <SectionMessage type="success" scope="section">
          Pairing Successful
        </SectionMessage>
        <div style={{ marginTop: '50px', fontSize: '1.1rem' }}>
          <Button type="primary" onClick={() => navigate('/')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MfaSuccessView;
