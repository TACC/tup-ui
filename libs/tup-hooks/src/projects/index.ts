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

export type ProjectEditBody = Pick<
  ProjectsRawSystem,
  'title' | 'description' | 'chargeCode' | 'fieldId' | 'secondaryFieldId'
>;

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

export type ProjectPublication = {
  id: number;
  authors: string;
  title: string;
  yearPublished?: string;
  publisher?: string;
  url?: string;
  venue?: string;
  userCitedTacc: boolean;
};

export type ProjectPublicationBody = Omit<ProjectPublication, 'id'>;

export type ProjectGrant = {
  id: number;
  title: string;
  fundingAgency?: string;
  field?: string;
  piName: string;
  awardNumber?: string;
  awardAmount?: number;
  start?: string;
  end?: string;
  nsfStatusCode?: string;
  grantNumber?: string;
  fieldId: number;
};
export type ProjectGrantBody = Omit<ProjectGrant, 'id'>;

export {
  default as useProjects,
  useProjectUpdate,
  useSetProjectDelegate,
  useRemoveProjectDelegate,
} from './useProjects';
export {
  default as useProjectUsers,
  useRoleForCurrentUser,
  useRoleForUser,
  useAddProjectUser,
  useRemoveProjectUser,
} from './useProjectUsers';
export { default as useProjectUsage } from './useProjectUsage';
export {
  usePublications,
  usePublicationEdit,
  usePublicationCreate,
} from './usePublications';
export { useGrants, useGrantEdit, useGrantCreate } from './useGrants';
export { default as useProjectScienceField } from './useProjectScienceField';
