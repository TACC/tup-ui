import React from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import { PageLayout } from '../layout';
import { TicketsTable } from './TicketsTable';

const TicketDetails: React.FC = () => {
  return <div>Select A Ticket</div>;
};

const Tickets: React.FC = () => {
  const outlet = useOutlet();
  return (
    <PageLayout
      left={<TicketsTable />}
      right={outlet ?? <div>Select A Ticket</div>}
    />
  );
};

export default Tickets;
