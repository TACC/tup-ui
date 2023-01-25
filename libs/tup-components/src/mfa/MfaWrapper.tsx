import React from 'react';
import MfaSuccessView from './MfaSuccessView';
import { useMfa } from '@tacc/tup-hooks';
import { LoadingSpinner } from '@tacc/core-components';

const MfaWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, data } = useMfa();

  if (isLoading) return <LoadingSpinner />;
  if (data?.token?.rollout_state === 'enrolled') return <MfaSuccessView />;
  /*eslint-disable-next-line react/jsx-no-useless-fragment */
  return <>{children}</>;
};

export default MfaWrapper;
