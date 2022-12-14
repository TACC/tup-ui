import { setLogger } from 'react-query';
import { string } from 'yup';

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

export type Reservation = {
  name: string;
  begin_time: string;
  end_time: string;
};

export type SystemMonitorRawSystem = {
  display_name: string;
  tas_name: string;
  hostname: string;
  system_type: string;
  timestamp: string;
  isOperational: boolean;
  online: boolean;
  // values may not be included in the TAP response if systems are down/unreachable
  reachable?: boolean;
  queues_down?: boolean;
  load?: number;
  running?: number;
  waiting?: number;
  in_maintenance?: boolean;
  next_maintenance?: string;
  reservations?: [Reservation];
};

export type ProjectsAllocations = {
  id: number;
  start: Date;
  end: Date;
  type: string;
  total: number;
  used: number;
  resource: string;
  status: string;
  storageQuota: number;
  myUsage: number;
  storageUsed: number;
  justification: string;
  computeRequested: number;
  storageRequested: number;
  memoryRequested: number;
  increases: {
    id: number;
    allocationId: number;
    susRequested: number;
    susGranted: number;
    justification: string;
    decisionSummary: string;
  };
};

export type ProjectsRawSystem = {
  id: number;
  title: string;
  description: string;
  chardeCode: string;
  gid: number;
  source: string;
  fieldId: number;
  secondaryFieldId: number;
  typeId: number;
  pi: {
    id: number;
    username: string;
    role: string;
    firstName: string;
    middleInitial: string;
    lastName: string;
    email: string;
    vislabTrained: boolean;
    staff: boolean;
  };
  allocations?: ProjectsAllocations[];
  roles: string;
  users: {
    id: number;
    username: string;
    role: string;
    firstName: string;
    middleInitial: string;
    lastName: string;
    email: string;
    vislabTrained: boolean;
    staff: boolean;
  };
};

export type Ticket = {
  AdminCc: [];
  'CF.{Resource}': string;
  Created: string;
  Creator: string;
  Due: string;
  FinalPriority: string;
  InitialPriority: string;
  LastUpdated: string;
  Owner: string;
  Priority: string;
  Queue: string;
  Requestors: string[];
  Resolved: string;
  Started: string;
  Starts: string;
  Status: string;
  Subject: string;
  TimeEstimated: string;
  TimeLeft: string;
  TimeWorked: string;
  Told: string;
  id: string;
  numerical_id: string;
};

export { default as useAuth } from './useAuth';
export { default as useProfile } from './useProfile';
export { default as useJwt } from './useJwt';
export { default as useSystemMonitor } from './useSystemMonitor';
export { default as useProjects } from './useProjects';
export { default as useProjectsAllocations } from './useAllocations';
export { default as useTickets } from './useTickets';
