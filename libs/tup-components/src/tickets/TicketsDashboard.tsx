import { SectionTableWrapper } from '@tacc/core-components';
import React from 'react';
import TicketCreateModal from './TicketCreateModal';
import { TicketsTable } from './TicketsTable';

const TicketsDashboard: React.FC = () => {
  return (
    <SectionTableWrapper
      header="My Tickets"
      headerActions={<TicketCreateModal title={'+ New Ticket'} />}
      contentShouldScroll
    >
      <TicketsTable />
    </SectionTableWrapper>
  );
};

export default TicketsDashboard;
