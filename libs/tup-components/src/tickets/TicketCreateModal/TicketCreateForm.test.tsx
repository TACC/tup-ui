import React, { useEffect } from 'react';
import { TicketCreateForm } from './TicketCreateForm';
import { server, testRender } from '@tacc/tup-testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

describe('TicketCreateForm Component', () => {
  it('should display a success message after mutation', async () => {
    const user = userEvent.setup();
    testRender(<TicketCreateForm />);
    const subject = screen.getByLabelText(/Subject/);
    const description = screen.getByLabelText(/Problem Description/);

    expect(await screen.findByDisplayValue('mock')).toBeDefined();

    await user.type(subject, 'test');
    await user.type(description, 'test');

    const submit = screen.getByRole('button', { name: /add ticket/i });
    expect(submit.getAttribute('disabled')).toBe(null);
    fireEvent.click(submit);

    expect(
      await screen.findByText(/Ticket with ID 12345 was created/)
    ).toBeDefined();
  });

  it('should display an error message if an error is returned from useMutation hook', async () => {
    const user = userEvent.setup();
    server.use(
      rest.post('http://localhost:8001/tickets', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    testRender(<TicketCreateForm />);

    expect(await screen.findByDisplayValue('mock')).toBeDefined();

    const subject = screen.getByLabelText(/Subject/);
    const description = screen.getByLabelText(/Problem Description/);

    await user.type(subject, 'test');
    await user.type(description, 'test');

    const submit = screen.getByRole('button', { name: /add ticket/i });
    expect(submit.getAttribute('disabled')).toBe(null);
    fireEvent.click(submit);

    expect(
      await screen.findByText(/There was an error creating your ticket/)
    ).toBeDefined();
  });
});
