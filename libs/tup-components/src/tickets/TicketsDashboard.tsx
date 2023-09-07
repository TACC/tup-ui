import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTableWrapper } from '@tacc/core-components';
import TicketCreateModal from './TicketCreateModal';
import { TicketsTable } from './TicketsTable';

import styles from './TicketsDashboard.module.css';

const TicketsDashboard: React.FC = () => {
  return (
    <SectionTableWrapper
      header="My Tickets"
      headerActions={
        <>
          <Link to="/tickets" className={styles['viewall-action']}>
            View all Tickets
          </Link>
          <TicketCreateModal display="secondary">
            + New Ticket
          </TicketCreateModal>
        </>
      }
      contentShouldScroll
    >
      <TicketsTable ticketsPath="/dashboard/tickets" />
    </SectionTableWrapper>
  );
};

export default TicketsDashboard;
