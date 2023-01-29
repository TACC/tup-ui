export { default as ProjectGrantCreateModal} from './ProjectGrantCreateModal'

export type GrantCreateFormValues = {
    id: number;
    title: string;
    fundingAgency: string;
    field: string;
    piName: string;
    awardNumber: number;
    awardAmount: number;
    start: string;
    end: string;
    nsfStatusCode: string;
    grantNumber: number;
    fieldId: number;
  };