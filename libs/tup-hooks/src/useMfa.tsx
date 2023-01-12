import _ from 'lodash';
import { UseQueryResult, useQueryClient } from 'react-query';
import { MfaTokenResponse, MfaPairingResponse, MfaValidationResponse } from '.';
import { useGet, usePost } from './requests';

// Query to retrieve the user's profile object.
export const useMfa = (): UseQueryResult<MfaTokenResponse> => {
  const query = useGet<MfaTokenResponse>({
    endpoint: '/mfa',
    key: 'mfa',
    options: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  });
  return query;
};

export const useMfaPairTotp = () => {
  const mutation = usePost<null, MfaPairingResponse>({
    endpoint: '/mfapair/totp',
    options: { mutationKey: 'mfapair' },
  });
  return mutation;
};

export const useMfaPairSms = () => {
  const mutation = usePost<{ phoneNumber: string }, MfaPairingResponse>({
    endpoint: '/mfapair/sms',
    options: { mutationKey: 'mfapair' },
  });
  return mutation;
};

export const useMfaValidate = () => {
  const client = useQueryClient();
  const mutation = usePost<{ password: string }, MfaValidationResponse>({
    endpoint: '/mfavalidate',
    options: { onSuccess: () => client.invalidateQueries({ queryKey: 'mfa' }) },
  });
  return mutation;
};
