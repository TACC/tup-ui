import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { useGet, usePost } from '../requests';
import { Ticket, TicketHistory } from '.';
import { useConfig } from '..';
import { useJwt } from '../auth';

import axios from 'axios';

// Query to retrieve the user's tickets.
export const useGetTickets = (): UseQueryResult<Ticket[]> => {
  const query = useGet<Ticket[]>({
    endpoint: '/tickets',
    key: ['tickets'],
  });
  return query;
};

// Query to retrieve detailed info for a specific ticket.
export const useGetTicketDetails = (
  ticketId: string
): UseQueryResult<Ticket> => {
  const query = useGet<Ticket>({
    endpoint: `/tickets/${ticketId}`,
    key: [`tickets/${ticketId}`],
  });
  return query;
};

// Query to retrieve ticket history info for a specific ticket.
export const useGetTicketHistory = (
  ticketId: string
): UseQueryResult<TicketHistory> => {
  const query = useGet<TicketHistory>({
    endpoint: `/tickets/${ticketId}/history`,
    key: [`tickets/${ticketId}/history`],
  });
  return query;
};

const downloadAttachment = async (
  ticketId: string,
  attachmentId: number,
  baseUrl: string,
  jwt?: string
) => {
  const response = await axios({
    method: 'get',
    url: `${baseUrl}/tickets/${ticketId}/attachment/${attachmentId}`,
    headers: { 'x-tup-token': jwt ?? '' },
    responseType: 'blob',
  });

  const fileName = response.headers['content-disposition']
    ?.split('filename=')[1]
    .split(';')[0];
  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Query to retrieve a specific file attachment from a specific ticket history.
export const useGetFileAttachment = (
  ticketId: string
): { download: (attachmentId: number) => Promise<void> } => {
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();

  return {
    download: (attachmentId: number) =>
      downloadAttachment(ticketId, attachmentId, baseUrl, jwt),
  };
};

// Mutation to POST new ticket form data to tup-services.
export const useTicketCreate = () => {
  const queryClient = useQueryClient();
  const mutation = usePost<FormData, string>({
    endpoint: '/tickets',
    options: {
      onSuccess: () => queryClient.invalidateQueries([`tickets`]),
    },
  });
  return mutation;
};

// Mutation to POST new ticket form data to tup-services for a non-authenticated user.
export const useTicketCreateNoAuth = () => {
  const queryClient = useQueryClient();
  const mutation = usePost<FormData, string>({
    endpoint: '/tickets/noauth',
    options: {
      onSuccess: () => queryClient.invalidateQueries([`tickets`]),
    },
  });
  return mutation;
};

// Mutation to POST new reply form data to tup-services.
export const useTicketReply = (ticketId: string) => {
  const queryClient = useQueryClient();
  const mutation = usePost<FormData, string>({
    endpoint: `/tickets/${ticketId}/reply`,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries([`tickets/${ticketId}/history`]);
        queryClient.invalidateQueries([`tickets/${ticketId}`]);
        queryClient.invalidateQueries(['tickets']);
      },
    },
  });
  return mutation;
};
