export { default as TicketsDashboard } from './TicketsDashboard';
export { default as TicketCreateModal } from './TicketCreateModal';
export { default as Tickets } from './Tickets';
export { default as TicketModal } from './TicketDetailModal';

export const QUEUE_MAP = {
  Allocations: 'Accounting',
  'Data Analytics or Storage Resources': 'Data Intensive Computing',
  'Login/Authentication Issue': 'Accounting',
  'Running Jobs or Using TACC Resources': 'High Performance Computing',
  'Security Incident': 'NSO',
  Other: 'High Performance Computing',
};

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
  category: '' | keyof typeof QUEUE_MAP;
  resource: string;
};

export type historyCardParams = {
  created: Date;
  creator: string;
  isCreator: boolean;
  content: string;
  attachments?: Array<[number, string]>;
  ticketId: string;
};
