import { SectionTableWrapper } from '@tacc/core-components';
import React from 'react';
import TicketCreateModal from './TicketCreateModal';
import { TicketsTable } from './TicketsTable';

const TicketsDashboard: React.FC = () => {
  return (
    <SectionTableWrapper
      header="My Tickets"
      headerActions={
        <TicketCreateModal display="secondary" size="small">
          + New Ticket
        </TicketCreateModal>
      }
      contentShouldScroll
    >
      <TicketsTable ticketsPath="/dashboard/tickets" />
    </SectionTableWrapper>
  );
};

export default TicketsDashboard;
