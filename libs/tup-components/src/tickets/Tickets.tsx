import React from 'react';
import { Outlet } from 'react-router-dom';
import { SectionHeader, SectionTableWrapper } from '@tacc/core-components';
import { TicketsTable } from './TicketsTable';
import { RequireAuth } from '../utils';
import TicketCreateModal from './TicketCreateModal';

const Tickets: React.FC = () => {
  return (
    <RequireAuth>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <SectionHeader actions={<TicketCreateModal display='secondary'>+ New Ticket</TicketCreateModal>}>
          Tickets
        </SectionHeader>
        <SectionTableWrapper contentShouldScroll className="ticket-container">
          <TicketsTable />
        </SectionTableWrapper>
        <Outlet />
      </section>
    </RequireAuth>
  );
};

export default Tickets;
