import React from 'react';
import TicketsDashboard from './TicketsDashboard';
import { testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';

describe('TicketsDashboard Component', () => {
  it('should render SectionTableWrapper and Table components', async () => {
    const { getByText } = testRender(<TicketsDashboard />);
    await waitFor(() => expect(getByText('Subject')).toBeDefined());
    expect(getByText('+ New Ticket')).toBeDefined();
    expect(getByText('My Tickets')).toBeDefined();
    expect(getByText('Ticket Status')).toBeDefined();
  });
});
