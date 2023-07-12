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

export type UserSearchResult = {
  username: string;
  name: string;
  email: string;
};

export { default as useAuth } from './useAuth';
export { default as useJwt } from './useJwt';
export { default as useProfile } from './useProfile';
export { default as useUserLookup } from './useUserLookup';
