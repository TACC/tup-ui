import React, { useMemo } from 'react';
import { Column, Row } from 'react-table';
import {
  InfiniteScrollTable,
  InlineMessage,
  LoadingSpinner,
} from '@tacc/core-components';
import { Ticket, useTickets } from '@tacc/tup-hooks';
import { DateCreated, Status, Subject } from './TicketsCells';
import './TicketsView.scss';

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
  const { data, isLoading, error } = useTickets();
  const noDataText = <>No tickets. You can add a ticket here.</>;

  const columns = useMemo<Column<Ticket>[]>(
    () => [
      {
        accessor: 'numerical_id',
        Header: 'Ticket Number',
      },
      {
        accessor: 'Subject',
        Header: 'Subject',
        Cell: Subject,
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
    []
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

  if (error) {
    return (
      <InlineMessage type="warning">
        Unable to retrieve ticket information
      </InlineMessage>
    );
  }

  return (
    <InfiniteScrollTable
      tableColumns={columns}
      tableData={data ?? []}
      isLoading={isLoading}
      className="tickets-view"
      noDataText={noDataText}
      getRowProps={rowProps}
    />
  );
};
