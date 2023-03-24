export type SoftwareResult = {
  package: string;
  topic: string;
  resources: string[];
};

export type SoftwareDetail = {
  name: string;
  displayName: string;
  description: string;
  url: string;
  resources: SoftwareResource[];
};

export type SoftwareResource = {
  name: string;
  defaultVersion: string;
  versions: {
    id: string;
    name: string;
    description: string;
    versionSort: string;
    modulePaths: string[];
  }[];
};

export { useSoftware, useSoftwareDetail } from './useSoftware';
