import React from 'react';
import { useLocation } from 'react-router-dom';
import MfaSelection from './MfaSelection';
import MfaSuccessView from './MfaSuccessView';
import { useMfa } from '@tacc/tup-hooks';
import { LoadingSpinner } from '@tacc/core-components';

const MfaWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const isUnpairing = location.pathname.includes('unpair');
  const isPairing = location.pathname.includes('pair') && !isUnpairing;
  const { isLoading, data } = useMfa();

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (data?.token?.rollout_state === 'enrolled' && isPairing) {
    return <MfaSuccessView task="pair" />;
  } else if (data?.token?.rollout_state === 'verify' && isUnpairing) {
    return <MfaSuccessView task="unpair" />;
  } else if (!data) {
    return <MfaSelection />;
  } else {
    return {children};
  }
};

export default MfaWrapper;
