import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, InlineMessage, LoadingSpinner } from '@tacc/core-components';
import { Ticket, useGetTicketHistory, useGetTickets } from '@tacc/tup-hooks';
import './TicketsTable.global.css';
import { formatDate } from '../utils/timeFormat';

const TICKETS_DASHBOARD_DISPLAY_LIMIT = 12;

export const getStatusText = (status: string) => {
  switch (status) {
    case 'new':
      return 'New';
    case 'closed':
    case 'resolved':
      return 'Resolved';
    case 'open':
      return 'In Progress';
    case 'user_wait':
      return 'Reply Required';
    case 'internal_wait':
      return 'Reply Sent';
    default:
      return '--';
  }
};

const AttachmentIndicator: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const { data } = useGetTicketHistory(ticketId);

  if (
    data?.some((ticket) =>
      ticket.Attachments.some((att) => !att[1].startsWith('untitled'))
    )
  )
    return <Icon dataTestid="attachment-icon" name="link"></Icon>;
  return null;
};

export const TicketsTable: React.FC = () => {
  const { data, isLoading, isError } = useGetTickets();
  const pathname = useLocation().pathname;
  let ticketData: Array<Ticket> = [];

  if (pathname.startsWith('/tickets')) {
    ticketData = data ?? [];
  } else {
    ticketData = data?.slice(0, TICKETS_DASHBOARD_DISPLAY_LIMIT) ?? [];
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <InlineMessage type="warning" className="ticket__error">
        Unable to retrieve ticket information
      </InlineMessage>
    );
  }

  if (data && data.length === 0) {
    return (
      <>No tickets. You can add a ticket by clicking "New Ticket" above.</>
    );
  }

  return (
    <div className="o-fixed-header-table">
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Ticket Number</th>
            <th>Subject</th>
            <th>Date Added</th>
            <th>Ticket Status</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.map((ticket) => (
            <tr
              key={ticket.numerical_id}
              className={
                ticket.Status === 'user_wait' ? 'ticket-reply-required' : ''
              }
            >
              <td>{ticket.numerical_id}</td>
              <td>
                <Link to={`/tickets/${ticket.numerical_id}`}>
                  {ticket.Subject}
                </Link>{' '}
                <AttachmentIndicator ticketId={ticket.numerical_id} />
              </td>
              <td>{formatDate(new Date(ticket.Created))}</td>
              <td>{getStatusText(ticket.Status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
