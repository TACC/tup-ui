import React from 'react';
import { Button, SectionTableWrapper } from '@tacc/core-components';
import TicketCreateModal from './TicketCreateModal';
import { TicketsTable } from './TicketsTable';

const TicketsDashboard: React.FC = () => {
  return (
    <SectionTableWrapper
      header="My Tickets"
      headerActions={
        <TicketCreateModal>
          <Button type="secondary" size="small">
            + New Ticket
          </Button>
        </TicketCreateModal>
      }
      contentShouldScroll
    >
      <TicketsTable ticketsPath="/dashboard/tickets" />
    </SectionTableWrapper>
  );
};

export default TicketsDashboard;
