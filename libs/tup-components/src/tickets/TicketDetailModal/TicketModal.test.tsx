import React from 'react';
import { server, testRender } from '@tacc/tup-testing';
import { fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { TicketHistory } from './TicketHistory';
import { TicketReplyForm } from './TicketReplyForm';
import { vi } from 'vitest';

window.HTMLElement.prototype.scrollIntoView = vi.fn();

const resolvedStatus = 'resolved';
const unresolvedStatus = '';

describe('Ticket Modal', () => {
  it('should render ticket history information and reply form', async () => {
    const { getByText, getAllByText, getByTestId } = testRender(
      <TicketHistory ticketId="85411" />
    );
    expect(getByTestId('loading-spinner')).toBeDefined();
    await waitFor(() =>
      expect(getAllByText(/test; please ignore/).length).toEqual(4)
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
      <TicketReplyForm ticketId="85411" ticketStatus={resolvedStatus} />
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
      <TicketReplyForm ticketId="85411" ticketStatus={resolvedStatus} />
    );

    const reply = getByLabelText(/Reply/);
    const submit = getByRole('button', { name: 'Reply' });
    await user.type(reply, 'error message?');
    fireEvent.click(submit);

    await waitFor(() =>
      expect(getByText('Something went wrong.')).toBeDefined()
    );
  });

  it('should render an success message if an reply success is returned from the useMutation hook', async () => {
    const user = userEvent.setup();
    server.use(
      rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) =>
        res.once(ctx.status(200))
      )
    );
    const { getByLabelText, getByText, getByRole } = testRender(
      <TicketReplyForm ticketId="85411" ticketStatus={resolvedStatus} />
    );

    const reply = getByLabelText(/Reply/);
    const submit = getByRole('button', { name: 'Reply' });
    await user.type(reply, 'success message?');
    fireEvent.click(submit);

    await waitFor(() =>
      expect(getByText(/Your reply has been sent/)).toBeDefined()
    );
  });

  it('should disable the reply button on load and enable it when reply is entered', async () => {
    const user = userEvent.setup();
    server.use(
      rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) =>
        res.once(ctx.status(200))
      )
    );

    const { getByLabelText, getByRole } = testRender(
      <TicketReplyForm ticketId="85411" ticketStatus={unresolvedStatus} />
    );

    //If reply is empty, the button should be disabled
    const replyButton = getByRole('button', {
      name: 'Reply',
    }) as HTMLButtonElement;
    expect(replyButton.disabled).toBe(true);

    //If reply is filled, button should be enabled
    const reply = getByLabelText(/Reply/);
    await user.type(reply, 'reply disabled?');
    expect(replyButton.disabled).toBe(false);

    //Changing back to empty reply
    await user.clear(reply);
    expect(replyButton.disabled).toBe(true);
  });

  it('should disable the reply button on load and enable it when checkbox is checked', async () => {
    server.use(
      rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) =>
        res.once(ctx.status(200))
      )
    );

    const { getByRole } = testRender(
      <TicketReplyForm ticketId="85411" ticketStatus={unresolvedStatus} />
    );

    //If reply is empty, the button should be disabled
    const replyButton = getByRole('button', {
      name: 'Reply',
    }) as HTMLButtonElement;
    expect(replyButton.disabled).toBe(true);

    //If checkbox is checked, button should be enabled
    const checkbox = getByRole('checkbox', {
      name: /ticket status/i,
    }) as HTMLInputElement;

    console.log(checkbox);

    waitFor(() => {
      fireEvent.click(checkbox);
    });

    expect(replyButton.disabled).toBe(false);

    waitFor(() => {
      fireEvent.click(checkbox);
    });

    expect(replyButton.disabled).toBe(true);
  });

  it('should remove required reply when checkbox is checked', () => {
    server.use(
      rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) =>
        res.once(ctx.status(200))
      )
    );

    const { getByRole, queryByText, getByText } = testRender(
      <TicketReplyForm ticketId="85411" ticketStatus={unresolvedStatus} />
    );

    // The required label needs to be present
    // Will result in error if not present - hence getbytext
    getByText(/required/i);

    //If checkbox is checked, button should be enabled
    waitFor(() => {
      const checkbox = getByRole('checkbox', {
        name: /ticket status/i,
      }) as HTMLInputElement;
      fireEvent.click(checkbox);
    });

    // The required label should not be there - hence querybytext
    const requiredLabelAfterClick = queryByText(/required/i);
    expect(requiredLabelAfterClick).toBeNull();
  });

  it('should check the checkbox and disable it if status is resolved - replying will reopen the ticket should appear', async () => {
    server.use(
      rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) =>
        res.once(ctx.status(200))
      )
    );

    const { getByRole, getByText } = testRender(
      //If ticket were not resolved, this test will fail
      <TicketReplyForm ticketId="85411" ticketStatus={resolvedStatus} />
    );

    await waitFor(() => {
      const checkbox = getByRole('checkbox', {
        name: /ticket status/i,
      }) as HTMLInputElement;

      // Expect the checkbox to be checked
      expect(checkbox.checked).toBe(true);

      // Expect the checkbox to be disabled
      expect(checkbox.disabled).toBe(true);
    });

    getByText(/replying will reopen this ticket/i);
  });
});
