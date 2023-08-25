import React from 'react';
import MfaSelection from './MfaSelection';
import MfaSuccessView from './MfaSuccessView';
import { useMfa } from '@tacc/tup-hooks';
import { LoadingSpinner } from '@tacc/core-components';

const MfaWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, data } = useMfa();
  const hasToken = Boolean( data?.token?.tokentype );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (data?.token?.rollout_state === 'enrolled' && !hasToken) {
    return <MfaSuccessView task="pair" />;
  }
  if (data?.token?.rollout_state === 'verify' && hasToken) {
    return <MfaSuccessView task="unpair" />;
  }
  if (!data) {
    return <MfaSelection />;
  }

  /*eslint-disable-next-line react/jsx-no-useless-fragment */
  return <>{children}</>;
};

export default MfaWrapper;
