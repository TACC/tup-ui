import React from 'react';
import TicketModal from './TicketModal';
import { server, testRender } from '@tacc/tup-testing';
import { act, fireEvent, waitFor, within } from '@testing-library/react';
import { rest } from 'msw';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    ticketId: '85411',
  }),
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Ticket Modal', () => {
  it('should render ticket history information and reply form', async () => {
    const { getByText, getAllByText, getByLabelText, getByTestId } = testRender(
      <TicketModal />
    );
    expect(getByTestId('loading-spinner')).toBeDefined();
    await waitFor(() =>
      expect(getAllByText('test; please ignore').length).toEqual(2)
    );
    expect(getByText('Ticket 85411')).toBeDefined();
    expect(getByText('testFile.txt (10b)')).toBeDefined();
    expect(getByLabelText(/Reply/)).toBeDefined();
  });
  it('should render a loading spinner if the form is valid and the Reply button is clicked', async () => {
    server.use(
      rest.post(
        'http://localhost:8001/tickets/85411/reply',
        (req, res, ctx) => {
          return res(ctx.delay(500), ctx.json(true));
        }
      )
    );
    const { getByLabelText, getByRole } = testRender(<TicketModal />);
    const reply = getByLabelText(/Reply/);
    const submit = getByRole('button', { name: 'Reply' });
    await act(async () => {
      fireEvent.change(reply, { target: { value: 'It works!' } });
      fireEvent.click(submit);
    });
    await waitFor(() =>
      expect(within(submit).getByTestId('loading-spinner')).toBeDefined()
    );
  });
  it('should render an error message if an error is returned from the useMutation hook', async () => {
    server.use(
      rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    const { getByLabelText, getByText, getByRole } = testRender(
      <TicketModal />
    );
    const reply = getByLabelText(/Reply/);
    const submit = getByRole('button', { name: 'Reply' });
    await act(async () => {
      fireEvent.change(reply, { target: { value: 'error message?' } });
      fireEvent.click(submit);
    });
    await waitFor(() =>
      expect(getByText('Something went wrong.')).toBeDefined()
    );
  });
});
