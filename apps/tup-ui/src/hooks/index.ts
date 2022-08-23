import { setLogger } from 'react-query';

// Disable error logging when we throw inside a react-query fetcher method.
setLogger({
  log: window.console.log,
  warn: window.console.warn,
  error: () => {
    /* */
  },
});

// Extend the window type to support custom config passed from the server side.
declare global {
  interface Window {
    __TUP_CONFIG__: {
      baseUrl: string;
    };
  }
}

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  institutionId: number;
  department: string;
  departmentId: number;
  country: string;
  countryId: number;
  citizenship: string;
  citizenshipId: number;
  piEligibility: string;
  phone: string;
  title: string;
  uid: number;
  homeDirectory: string;
  gid: number;
  emailConfirmations: string[];
};

export type AuthResponse = {
  exp: number;
  iat: number;
  ttl: number;
  jwt: string;
  username: string;
  profile: UserProfile;
};

export type AuthBody = {
  username: string;
  password: string;
};

export type SysmonHost = {
  hostname: string;
  displayName: string;
  ssh: {
    type: string;
    status: boolean;
    timestamp: string;
  }
  tests: {
    heartbeat: {
      type: string;
      status: boolean;
      timestamp: string;
    }
    ssh: {
      type: string;
      status: boolean;
      timestamp: string;
    }
  }
  timestamp: string;
  jobs: {
    running: number;
    queued: number;
    other: number;
  }
  totalCpu: number;
  usedCpu: number;
  load: number;
  heartbeat: {
    type: string;
    status: boolean;
    timestamp: string;
  }
}

export type SystemMonitor = {
  [hostname: string]: SysmonHost;
}

export { default as useAuth } from './useAuth';
export { default as useProfile } from './useProfile';
export { default as useJwt } from './useJwt';
