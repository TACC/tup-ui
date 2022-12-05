import React, { useMemo } from 'react';
import { Column, Row } from 'react-table';
import { Link, useLocation } from 'react-router-dom';
import {
  InfiniteScrollTable,
  InlineMessage,
  LoadingSpinner,
} from '@tacc/core-components';
import { Ticket, useGetTickets } from '@tacc/tup-hooks';
import { DateCreated, Status } from './TicketsCells';
import './TicketsTable.global.css';

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
      throw new RangeError('no defined text for this status');
  }
};

export const TicketsTable: React.FC = () => {
  const { data, isLoading, isError } = useGetTickets();
  const pathname = useLocation().pathname;
  let [historyModalBasePath, createModalPath] = ['', ''];
  let ticketData: Array<Ticket> = [];

  if (
    pathname === '/' ||
    pathname === '/ticket-create' ||
    pathname.startsWith('/tickets-dashboard')
  ) {
    historyModalBasePath = 'tickets-dashboard';
    createModalPath = 'ticket-create';
    ticketData = data?.slice(0, 12) ?? [];
  } else {
    historyModalBasePath = 'tickets';
    createModalPath = 'tickets/create';
    ticketData = data ?? [];
  }

  const noDataText = (
    <>
      No tickets. You can add a ticket{' '}
      <Link className="wb-link" to={`/${createModalPath}`}>
        here
      </Link>
      .
    </>
  );

  const columns = useMemo<Column<Ticket>[]>(
    () => [
      {
        accessor: 'numerical_id',
        Header: 'Ticket Number',
      },
      {
        accessor: 'Subject',
        Header: 'Subject',
        Cell: (el) => (
          <Link
            to={`/${historyModalBasePath}/${el.row.original.numerical_id}`}
            className="wb-link"
          >
            <span title={el.value}>{el.value}</span>
          </Link>
        ),
      },
      {
        accessor: 'Created',
        Header: 'Date Added',
        Cell: DateCreated,
      },
      {
        accessor: (d) => {
          try {
            return { text: getStatusText(d.Status), unknownStatusText: false };
          } catch {
            return { text: d.Status, unknownStatusText: true };
          }
        },
        Header: 'Ticket Status',
        Cell: Status,
      },
    ],
    [historyModalBasePath]
  );

  const rowProps = (row: Row<Ticket>) => {
    return {
      className:
        row.original.Status === 'user_wait' ? 'ticket-reply-required' : '',
    };
  };

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

  return (
    <InfiniteScrollTable
      tableColumns={columns}
      tableData={ticketData}
      isLoading={isLoading}
      className="tickets-view"
      noDataText={noDataText}
      getRowProps={rowProps}
    />
  );
};
