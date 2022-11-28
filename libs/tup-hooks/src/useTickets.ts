import { UseQueryResult, useQueryClient } from 'react-query';
import { useGet, usePost } from './requests';
import { Ticket, TicketHistory } from '.';

// Query to retrieve the user's tickets.
export const useGetTickets = (): UseQueryResult<Ticket[]> => {
  const query = useGet<Ticket[]>({
    endpoint: '/tickets',
    key: 'tickets',
  });
  return query;
};

// Query to retrieve detailed info for a specific ticket.
export const useGetTicketDetails = (
  ticketId: string
): UseQueryResult<Ticket> => {
  const query = useGet<Ticket>({
    endpoint: `/tickets/${ticketId}`,
    key: `tickets/${ticketId}`,
  });
  return query;
};

// Query to retrieve ticket history info for a specific ticket.
export const useGetTicketHistory = (
  ticketId: string
): UseQueryResult<TicketHistory> => {
  const query = useGet<TicketHistory>({
    endpoint: `/tickets/${ticketId}/history`,
    key: `tickets/${ticketId}/history`,
  });
  return query;
};

// Query to retrieve a specific file attachment from a specific ticket history.
export const useGetFileAttachment = (
  ticketId: string,
  attachmentId: string
): UseQueryResult<File> => {
  const query = useGet<File>({
    endpoint: `/tickets/${ticketId}/attachment/${attachmentId}`,
    key: `tickets/${ticketId}/attachment/${attachmentId}`,
  });
  return query;
};

// Mutation to POST new ticket form data to tup-services.
export const useTicketCreate = () => {
  const mutation = usePost<FormData, string>({
    endpoint: '/tickets',
  });
  return mutation;
};

// Mutation to POST new ticket form data to tup-services for a non-authenticated user.
export const useTicketCreateNoAuth = () => {
  const mutation = usePost<FormData, string>({
    endpoint: '/tickets/noauth',
  });
  return mutation;
};

// Mutation to POST new reply form data to tup-services.
export const useTicketReply = (ticketId: string) => {
  const queryClient = useQueryClient();
  const mutation = usePost<FormData, string>({
    endpoint: `/tickets/${ticketId}/reply`,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries([`tickets/${ticketId}/history`]),
    },
  });
  return mutation;
};
