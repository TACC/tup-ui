import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SectionTableWrapper } from '@tacc/core-components';
import { TicketsTable } from './TicketsTable';

const Tickets: React.FC = () => {
  return (
    <div>
      <SectionTableWrapper
        header="Tickets"
        headerActions={
          <Link to={'create'} className="btn btn-secondary btn-sm">
            + New Ticket
          </Link>
        }
        contentShouldScroll
      >
        <TicketsTable />
      </SectionTableWrapper>
      <Outlet />
    </div>
  );
};

export default Tickets;
