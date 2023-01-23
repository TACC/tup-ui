import React from 'react';
import { TicketCreateForm } from './TicketCreateForm';
import { server, testRender } from '@tacc/tup-testing';
import {
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react';
import { rest } from 'msw';

describe('TicketCreateForm Component', () => {
  it('should display a success message after mutation', async () => {
    testRender(<TicketCreateForm />);
    const subject = screen.getByLabelText(/Subject/);
    const description = screen.getByLabelText(/Problem Description/);
    const submit = screen.getByRole('button', { name: /add ticket/i });

    expect(await screen.findByDisplayValue('mock')).toBeDefined();

    fireEvent.change(subject, { target: { value: 'test' } });
    fireEvent.change(description, { target: { value: 'test' } });
    fireEvent.click(submit);

    expect(
      await screen.findByText(/Ticket with ID 12345 was created/)
    ).toBeDefined();
  });

  it('should display an error message if an error is returned from useMutation hook', async () => {
    server.use(
      rest.post('http://localhost:8001/tickets', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    testRender(<TicketCreateForm />);

    expect(await screen.findByDisplayValue('mock')).toBeDefined();

    const subject = screen.getByLabelText(/Subject/);
    const description = screen.getByLabelText(/Problem Description/);
    const submit = screen.getByRole('button', { name: /add ticket/i });

    fireEvent.change(subject, { target: { value: 'test' } });
    fireEvent.change(description, { target: { value: 'test' } });
    fireEvent.click(submit);

    expect(
      await screen.findByText(/There was an error creating your ticket/)
    ).toBeDefined();
    server.resetHandlers();
  });
});
