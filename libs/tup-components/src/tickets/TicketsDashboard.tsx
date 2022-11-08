import { SectionTableWrapper } from '@tacc/core-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { TicketsTable } from './TicketsTable';

const TicketsDashboard: React.FC = () => {
  return (
    <SectionTableWrapper
      header="My Tickets"
      headerActions={
        <Link to={'tickets/create'} className="btn btn-secondary btn-sm">
          New Ticket
        </Link>
      }
      contentShouldScroll
    >
      <TicketsTable />
    </SectionTableWrapper>
  );
};

export default TicketsDashboard;
