import React from 'react';
import { Outlet } from 'react-router-dom';
import { SectionHeader, SectionTableWrapper } from '@tacc/core-components';
import { TicketsTable } from './TicketsTable';
import { RequireAuth } from '../utils';
import TicketCreateModal from './TicketCreateModal';
import styles from './Tickets.module.css';

const Tickets: React.FC = () => {
  return (
    <RequireAuth>
      <section className={styles['tickets-section']}>
        <SectionHeader
          actions={
            <TicketCreateModal display="secondary" size="small">
              + New Ticket
            </TicketCreateModal>
          }
        >
          Tickets
        </SectionHeader>
        <SectionTableWrapper contentShouldScroll className="ticket-container">
          <TicketsTable ticketsPath="/tickets" />
        </SectionTableWrapper>
        <Outlet />
      </section>
    </RequireAuth>
  );
};

export default Tickets;
