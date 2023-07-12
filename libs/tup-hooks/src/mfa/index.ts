export type MfaTokenResponse = {
  token?: {
    active: boolean;
    description: string;
    id: number;
    locked: boolean;
    revoked: boolean;
    serial: string;
    tokentype: 'sms' | 'totp';
    user_id: string;
    user_realm: string;
    username: string;
    rollout_state: 'verify' | 'enrolled';
  };
};

export type MfaPairingResponse = {
  googleurl: {
    description: string;
    img: string;
  };
  otpkey: {
    description: string;
    img: string;
    value: string;
    value_b32: string;
  };
  rollout_state: string;
  serial: string;
};

export type MfaValidationResponse = {
  detail: {
    otplen: number;
    serial: string;
    type: string;
    message: string;
  };
  result: {
    authentication: 'ACCEPT' | 'REJECT';
    status: boolean;
    value: boolean;
  };
};

export {
  useMfa,
  useMfaPairTotp,
  useMfaPairSms,
  useMfaVerify,
  useMfaDelete,
  useMfaChallenge,
  useMfaEmailUnpair,
} from './useMfa';
