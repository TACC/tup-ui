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
  }
  if (data?.token?.rollout_state === 'enrolled' && isPairing) {
    return <MfaSuccessView task="pair" />;
  }
  if (data?.token?.rollout_state === 'verify' && isUnpairing) {
    return <MfaSuccessView task="unpair" />;
  }
  if (!data) {
    return <MfaSelection />;
  }

  /*eslint-disable-next-line react/jsx-no-useless-fragment */
  return <>{children}</>;
};

export default MfaWrapper;
