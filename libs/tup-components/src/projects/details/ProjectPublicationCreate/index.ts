export { default as ProjectPublicationCreateModal} from './ProjectPublicationCreateModal'

export type PublicationCreateFormValues = {
    title: string;
    authors: string;
    yearPublished: number;
    publisher: string;
    venue: string;
    url: string;
    userCitedTacc: boolean;
  };