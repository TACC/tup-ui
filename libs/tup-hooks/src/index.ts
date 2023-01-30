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
  department: string | null;
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
  start: string;
  end: string;
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

export type ProjectFieldOfScience = {
  id: number;
  depth: number;
  name: string;
};

export type ProjectsRawSystem = {
  id: number;
  title: string;
  description: string;
  chargeCode: string;
  gid: number;
  source: string;
  fieldId: number;
  secondaryFieldId: number;
  typeId: number;
  totalStorageUsed?: number;
  totalStorage?: number;
  totalCompute?: number;
  totalComputeUsed?: number;
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

export type TicketHistoryEntry = {
  id: string;
  Ticket: string;
  TimeTaken: string;
  Type: string;
  Field: string;
  OldValue: string;
  NewValue: string;
  Data: string;
  Description: string;
  Content: string;
  Creator: string;
  Created: string;
  Attachments: Array<[number, string]>;
};

export type TicketHistory = Array<TicketHistoryEntry>;

export type CreateTicketBody = {
  subject: string;
  description: string;
  first_name: string;
  last_name: string;
  email: string;
  cc: string;
  attachments: File[];
};

export type CreateTicketResponse = {
  ticketId: string;
};

export type ProjectUser = {
  id: number;
  username: string;
  role?: string;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  email: string;
  vislabTrained?: boolean;
  staff?: boolean;
};

export type AllocationUsage = {
  allocationId: number;
  usage: { username: string; usage: number }[];
};

export type UsagePerResource = {
  resource: string;
  total: number;
  used: number;
};

export type Publications = {
  id: number;
  authors: string;
  title: string;
  yearPublished: string;
  publisher: string;
  url: string;
  venue: string;
  userCitedTacc: boolean;
};

export type Grants = {
  id: number;
  title: string;
  fundingAgency: string;
  field: string;
  piName: string;
  awardNumber: string;
  awardAmount: number | null;
  start: string;
  end: string;
  nsfStatusCode: string;
  grantNumber: string;
  fieldId: number;
};

export type Abstract = {
  description: string;
};

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

export type UserNewsResponse = {
  ID: string;
  Updates: {
    AnnouncementUpdate: { ID: string; PostedDate: string; Content: string }[];
  };
  Author: string;
  PostedDate: string;
  AnnouncementDate: string;
  ArchiveDate: string;
  Title: string;
  Subtitle: string;
  WebTitle: string;
  Content: string;
};

export { default as useAuth } from './useAuth';
export { default as useProfile } from './useProfile';
export { default as useJwt } from './useJwt';
export { default as useConfig } from './useConfig';
export { default as useSystemMonitor } from './useSystemMonitor';
export {
  useGetFileAttachment,
  useGetTickets,
  useGetTicketDetails,
  useGetTicketHistory,
  useTicketCreate,
  useTicketCreateNoAuth,
  useTicketReply,
} from './useTickets';
export { default as useProjects } from './useProjects';
export { default as useProjectUsers } from './useProjectUsers';
export { default as useProjectUsage } from './useProjectUsage';
export { 
  usePublications, 
  usePublicationEdit,
  usePublicationCreate, 
  usePublicationDelete
} from './usePublications';
export {  
  useGrants, 
  useGrantEdit,
  useGrantCreate 
} from './useGrants';
export { useAbstract } from './useAbstract';
export { default as useProjectScienceField } from './useProjectScienceField';
export {
  useMfa,
  useMfaPairTotp,
  useMfaPairSms,
  useMfaVerify,
  useMfaDelete,
} from './useMfa';
export { useUserNews } from './useUserNews';
