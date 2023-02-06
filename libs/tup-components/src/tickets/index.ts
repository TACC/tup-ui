export { default as TicketsDashboard } from './TicketsDashboard';
export { default as TicketCreateModal } from './TicketCreateModal';
export { default as Tickets } from './Tickets';
export { default as TicketModal } from './TicketDetailModal';

export type StatusDisplay = {
  text: string;
  unknownStatusText: boolean;
};

export type CreateTicketFormValues = {
  subject: string;
  description: string;
  first_name: string;
  last_name: string;
  email: string;
  cc: string;
  files: File[];
};

export type historyCardParams = {
  created: Date;
  creator: string;
  isCreator: boolean;
  content: string;
  attachments?: Array<[number, string]>;
  ticketId: string;
};
