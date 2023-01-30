export { default as ProjectDetails } from './ProjectDetails';

export type PublicationFormValues = {
    title: string;
    authors: string;
    yearPublished: string;
    publisher: string;
    venue: string;
    url: string;
    userCitedTacc: boolean;
  };

  export type PublicationCreateFormValues = {
    title: string;
    authors: string;
    yearPublished: string;
    publisher: string;
    venue: string;
    url: string;
    userCitedTacc: boolean;
  };

  export type GrantFormValues = {
    id: number;
    title: string;
    fundingAgency: string;
    field: string;
    piName: string;
    awardNumber: string;
    awardAmount: number;
    start: string;
    end: string;
    nsfStatusCode: string;
    grantNumber: string;
    fieldId: number;
  };

  export type GrantCreateFormValues = {
    id: number;
    title: string;
    fundingAgency: string;
    field: string;
    piName: string;
    awardNumber: string;
    awardAmount: number;
    start: string;
    end: string;
    nsfStatusCode: string;
    grantNumber: string;
    fieldId: number;
  };

  export type ProjectDetailsFormValues = {
    chargeCode: string;
    primaryFieldID: string;
    secondaryFieldID: string;
    abstract: string;
    title: string;
  };