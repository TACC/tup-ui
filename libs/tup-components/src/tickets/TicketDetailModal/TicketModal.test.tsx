import React from 'react';
import { server, testRender } from '@tacc/tup-testing';
import {
  act,
  fireEvent,
  waitFor,
  within,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { TicketHistory } from './TicketHistory';
import { TicketReplyForm } from './TicketReplyForm';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Ticket Modal', () => {
  it('should render ticket history information and reply form', async () => {
    const { getByText, getAllByText, getByTestId } = testRender(
      <TicketHistory ticketId="85411" />
    );
    expect(getByTestId('loading-spinner')).toBeDefined();
    await waitFor(() =>
      expect(getAllByText('test; please ignore').length).toEqual(2)
    );
    expect(getByText('testFile.txt (10b)')).toBeDefined();
  });
  it('should render a loading spinner if the form is valid and the Reply button is clicked', async () => {
    const user = userEvent.setup();
    server.use(
      rest.post(
        'http://localhost:8001/tickets/85411/reply',
        (req, res, ctx) => {
          return res(ctx.delay(500), ctx.json(true));
        }
      )
    );
    const { getByLabelText, getByRole } = testRender(
      <TicketReplyForm ticketId="85411" />
    );
    const reply = getByLabelText(/Reply/);
    await user.type(reply, 'it works!');

    const submit = getByRole('button', { name: 'Reply' });
    fireEvent.click(submit);

    await waitFor(() =>
      expect(within(submit).getByTestId('loading-spinner')).toBeDefined()
    );
    // Loading spinner should be hidden once mutation completes.
    await waitFor(() =>
      expect(within(submit).queryByTestId('loading-spinner')).toBeNull()
    );
  });

  it('should render an error message if an error is returned from the useMutation hook', async () => {
    const user = userEvent.setup();
    server.use(
      rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    const { getByLabelText, getByText, getByRole } = testRender(
      <TicketReplyForm ticketId="85411" />
    );

    const reply = getByLabelText(/Reply/);
    const submit = getByRole('button', { name: 'Reply' });
    await user.type(reply, 'error message?');
    fireEvent.click(submit);

    await waitFor(() =>
      expect(getByText('Something went wrong.')).toBeDefined()
    );
  });
});
