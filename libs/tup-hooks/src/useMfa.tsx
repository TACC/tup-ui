import _ from 'lodash';
import { UseQueryResult, useQueryClient } from 'react-query';
import { MfaTokenResponse, MfaPairingResponse, MfaValidationResponse } from '.';
import { useGet, usePost, useDelete } from './requests';

// Query to retrieve the user's profile object.
export const useMfa = (): UseQueryResult<MfaTokenResponse> => {
  const query = useGet<MfaTokenResponse>({
    endpoint: '/mfa',
    key: 'mfa',
  });
  return query;
};

export const useMfaPairTotp = () => {
  const mutation = usePost<null, MfaPairingResponse>({
    endpoint: '/mfa/pair/totp',
    options: { mutationKey: 'mfapair' },
  });
  return mutation;
};

export const useMfaPairSms = () => {
  const mutation = usePost<{ phoneNumber: string }, MfaPairingResponse>({
    endpoint: '/mfa/pair/sms',
    options: { mutationKey: 'mfapair' },
  });
  return mutation;
};

export const useMfaVerify = () => {
  const client = useQueryClient();
  const mutation = usePost<{ password: string; type: 'sms' | 'totp' }, string>({
    endpoint: '/mfa/verify',
    options: { onSuccess: () => client.invalidateQueries({ queryKey: 'mfa' }) },
  });
  return mutation;
};

export const useMfaDelete = () => {
  const client = useQueryClient();
  const mutation = useDelete<string>({
    endpoint: '/mfa',
    options: { onSuccess: () => client.invalidateQueries({ queryKey: 'mfa' }) },
  });
  return mutation;
};
