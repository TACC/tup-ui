import React from 'react';
import { Outlet } from 'react-router-dom';
import { SectionTableWrapper } from '@tacc/core-components';
import { TicketsTable } from './TicketsTable';
import { RequireAuth } from '../utils';
import TicketCreateModal from './TicketCreateModal';

const Tickets: React.FC = () => {
  return (
    <RequireAuth>
      <>
        <SectionTableWrapper
          header="Tickets"
          headerActions={<TicketCreateModal />}
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
