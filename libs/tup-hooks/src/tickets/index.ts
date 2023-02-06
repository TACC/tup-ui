export type Ticket = {
  AdminCc: [];
  'CF.{Resource}': string;
  Created: string;
  Creator: string;
  Due: string;
  FinalPriority: string;
  InitialPriority: string;
  LastUpdated: string;
  Owner: string;
  Priority: string;
  Queue: string;
  Requestors: string[];
  Resolved: string;
  Started: string;
  Starts: string;
  Status: string;
  Subject: string;
  TimeEstimated: string;
  TimeLeft: string;
  TimeWorked: string;
  Told: string;
  id: string;
  numerical_id: string;
};

export type TicketHistoryEntry = {
  id: string;
  Ticket: string;
  TimeTaken: string;
  Type: string;
  Field: string;
  OldValue: string;
  NewValue: string;
  Data: string;
  Description: string;
  Content: string;
  Creator: string;
  Created: string;
  Attachments: Array<[number, string]>;
};

export type TicketHistory = Array<TicketHistoryEntry>;

export type CreateTicketBody = {
  subject: string;
  description: string;
  first_name: string;
  last_name: string;
  email: string;
  cc: string;
  attachments: File[];
};

export type CreateTicketResponse = {
  ticketId: string;
};

export {
  useGetFileAttachment,
  useGetTickets,
  useGetTicketDetails,
  useGetTicketHistory,
  useTicketCreate,
  useTicketCreateNoAuth,
  useTicketReply,
} from './useTickets';
