export { default as TicketsDashboard } from './TicketsDashboard';
export { default as TicketCreateModal } from './TicketCreateModal';
export { default as Tickets } from './Tickets';
export { default as TicketModal } from './TicketModal';

export type StatusDisplay = {
  text: string;
  unknownStatusText: boolean;
};

export type formValues = {
  subject: string;
  description: string;
  first_name: string;
  last_name: string;
  email: string;
  cc: string;
  files: File[];
};

export type attachment = [File, string];

export type historyCardParams = {
  created: Date;
  creator: string;
  isCreator: boolean;
  content: string;
  attachments?: Array<attachment>;
  ticketId: string;
};
