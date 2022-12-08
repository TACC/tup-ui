import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SectionTableWrapper } from '@tacc/core-components';
import { TicketsTable } from './TicketsTable';
import { RequireAuth } from '../utils';

const Tickets: React.FC = () => {
  return (
    <RequireAuth>
      <>
        <SectionTableWrapper
          header="Tickets"
          headerActions={
            <Link
              to={'create'}
              className="c-button c-button--secondary c-button--size-small"
            >
              + New Ticket
            </Link>
          }
          contentShouldScroll
        >
          <TicketsTable />
        </SectionTableWrapper>
        <Outlet />
      </>
    </RequireAuth>
  );
};

export default Tickets;
