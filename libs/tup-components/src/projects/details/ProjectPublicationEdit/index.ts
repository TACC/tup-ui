export { default as ProjectPublicationEditModal} from './ProjectPublicationEditModal'

export type PublicationFormValues = {
    title: string;
    authors: string;
    yearPublished: number;
    publisher: string;
    venue: string;
    url: string;
    userCitedTacc: boolean;
  };