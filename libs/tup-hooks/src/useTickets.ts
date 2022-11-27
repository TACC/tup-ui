import { UseQueryResult } from 'react-query';
import { useGet, usePost } from './requests';
import { Ticket } from '.';

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
  ticketId?: string
): UseQueryResult<Ticket> => {
  const query = useGet<Ticket>({
    endpoint: `/tickets/${ticketId}`,
    key: `tickets/${ticketId}`,
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
