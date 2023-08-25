import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { MfaTokenResponse, MfaPairingResponse } from '.';
import { useGet, usePost, useDelete } from '../requests';

// Query to retrieve the user's profile object.
export const useMfa = (): UseQueryResult<MfaTokenResponse> => {
  const query = useGet<MfaTokenResponse>({
    endpoint: '/mfa',
    key: ['mfa'],
  });
  return query;
};

export const useMfaPairTotp = () => {
  const mutation = usePost<null, MfaPairingResponse>({
    endpoint: '/mfa/totp',
    options: { mutationKey: ['mfapair'] },
  });
  return mutation;
};

export const useMfaPairSms = () => {
  const mutation = usePost<{ phoneNumber: string }, MfaPairingResponse>({
    endpoint: '/mfa/sms',
    options: { mutationKey: ['mfapair'] },
  });
  return mutation;
};

export const useMfaVerify = () => {
  const client = useQueryClient();
  const mutation = usePost<{ password: string; type: 'sms' | 'totp' }, string>({
    endpoint: '/mfa/verify',
    options: {
      onSuccess: () => client.invalidateQueries({ queryKey: ['mfa'] }),
    },
  });
  return mutation;
};

export const useMfaChallenge = () => {
  const mutation = usePost<null, string>({
    endpoint: '/mfa/challenge/sms',
  });
  return mutation;
};

export const useMfaDelete = () => {
  const client = useQueryClient();
  const mutation = useDelete<string>({
    endpoint: '/mfa',
    options: {
      onSuccess: () => client.invalidateQueries({ queryKey: ['mfa'] }),
    },
  });
  return mutation;
};

export const useMfaEmailUnpair = () => {
  const mutation = usePost<null, string>({
    endpoint: '/mfa/unpair',
  });
  return mutation;
};
