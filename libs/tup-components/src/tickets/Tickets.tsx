import React from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import { TicketsTable } from './TicketsTable';

const TicketDetails: React.FC = () => {
  return <div>Select A Ticket</div>;
};

const Tickets: React.FC = () => {
  const outlet = useOutlet();
  return <TicketsTable />;
};

export default Tickets;
