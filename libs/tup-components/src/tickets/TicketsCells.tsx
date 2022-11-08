import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { Ticket } from '@tacc/tup-hooks';
import { formatDate } from '../utils/timeFormat';
import { StatusDisplay } from '.';

export const DateCreated: React.FC<{ cell: Cell<Ticket, string> }> = ({
  cell: { value },
}) => <span>{`${formatDate(new Date(value))}`}</span>;

export const Status: React.FC<{ cell: Cell<Ticket, StatusDisplay> }> = ({
  cell: { value },
}) => (
  <span className={value.unknownStatusText ? 'ticket-unknown-status' : ''}>
    {value.text}
  </span>
);

export const Subject: React.FC<{ cell: Cell<Ticket, string> }> = ({
  cell: { value, row },
}) => <Link to={`/tickets/${row.original.numerical_id}`}>{value}</Link>;
{
  /* <Link to={`/tickets/${row.original.numerical_id}`}>{value}</Link>; */
}
