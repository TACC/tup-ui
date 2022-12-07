import { SectionTableWrapper } from '@tacc/core-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { TicketsTable } from './TicketsTable';

const TicketsDashboard: React.FC = () => {
  return (
    <SectionTableWrapper
      header="My Tickets"
      headerActions={
        <Link to={'ticket-create'} className="c-button c-button--secondary c-button--size-small">
          + New Ticket
        </Link>
      }
      contentShouldScroll
    >
      <TicketsTable />
    </SectionTableWrapper>
  );
};

export default TicketsDashboard;
