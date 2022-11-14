import React from 'react';
import { getStatusText, TicketsTable } from './TicketsTable';
import { server, testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('Tickets Table Component', () => {
  it('should render the tickets table', async () => {
    const { getByText, getAllByRole } = testRender(<TicketsTable />);
    await waitFor(() => getAllByRole('columnheader'));
    const columnHeaders: HTMLElement[] = getAllByRole('columnheader');
    expect(columnHeaders[0].textContent).toEqual('Ticket Number');
    expect(columnHeaders[1].textContent).toEqual('Subject');
    expect(columnHeaders[2].textContent).toEqual('Date Added');
    expect(columnHeaders[3].textContent).toEqual('Ticket Status');
    expect(getByText('84752')).toBeDefined();
    expect(getByText('Feedback for CEP')).toBeDefined();
    expect(getByText('10/13/2022')).toBeDefined();
    expect(getByText('Resolved')).toBeDefined();
  });
  it('should render message when there are no tickets to show', async () => {
    server.use(
      rest.get('http://localhost:8001/tickets', (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );
    const { getByText } = testRender(<TicketsTable />);
    await waitFor(() =>
      expect(getByText('No tickets. You can add a ticket here.')).toBeDefined()
    );
  });
  it('should render a loading spinner when waiting for data from useQuery', async () => {
    const { getByTestId } = testRender(<TicketsTable />);
    await waitFor(() => expect(getByTestId('loading-spinner')));
  });
  it('should display an error message if an error is returned from useQuery', async () => {
    server.use(
      rest.get('http://localhost:8001/tickets', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    const { getByText } = testRender(<TicketsTable />);
    await waitFor(() =>
      expect(getByText('Unable to retrieve ticket information')).toBeDefined()
    );
  });
  it('should have getStatusText helper function convert supported ticket status to proper UI strings', () => {
    expect(getStatusText('new')).toEqual('New');
    expect(getStatusText('closed')).toEqual('Resolved');
    expect(getStatusText('resolved')).toEqual('Resolved');
    expect(getStatusText('open')).toEqual('In Progress');
    expect(getStatusText('user_wait')).toEqual('Reply Required');
    expect(getStatusText('internal_wait')).toEqual('Reply Sent');
    expect(() => {
      getStatusText('random_status');
    }).toThrow(RangeError);
  });
});
