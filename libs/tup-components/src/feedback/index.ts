export { default as FeedbackModal } from './FeedbackModal';

export type feedbackFormValues = {
  subject: string;
  description: string;
  files: File[];
};
