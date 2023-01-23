import React from 'react';
import { TicketCreateForm } from './TicketCreateForm';
import { server, testRender } from '@tacc/tup-testing';
import {
  act,
  fireEvent,
  getByTestId,
  waitFor,
  screen,
} from '@testing-library/react';
import { rest } from 'msw';

const mockAuthenticatedUser = {
  id: 1051033,
  username: 'mmunstermann',
  email: 'max.munstermann@austin.utexas.edu',
  firstName: 'Max',
  lastName: 'Munstermann',
  institution: 'University of Texas at Austin (UT) (UT Austin)',
  institutionId: 1,
  department: null,
  departmentId: 0,
  country: 'United States',
  countryId: 230,
  citizenship: 'United States',
  citizenshipId: 230,
  piEligibility: 'Ineligible',
  phone: '808-555-6432 x',
  title: 'Center Non-Researcher Staff',
  uid: 111111,
  homeDirectory: '11111/mmunstermann',
  gid: 222222,
  emailConfirmations: [],
};

describe('TicketCreateForm Component', () => {
  it('should render initial values', async () => {
    testRender(<TicketCreateForm />);
    const subject = screen.getByLabelText(/Subject/);
    const description = screen.getByLabelText(/Problem Description/);
    const submit = screen.getByRole('button', { name: /add ticket/i });

    await waitFor(async () => {
      expect(screen.getByDisplayValue('mock')).toBeDefined();
      expect(screen.getByDisplayValue('user')).toBeDefined();
      expect(screen.getByDisplayValue('mock@user.com')).toBeDefined();
    });

    fireEvent.change(subject, { target: { value: 'test' } });
    fireEvent.change(description, { target: { value: 'test' } });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.queryAllByDisplayValue(/test/).length).toBe(0);
    });
  });

  it('should display a success message after mutation', async () => {
    testRender(<TicketCreateForm />);
    const subject = screen.getByLabelText(/Subject/);
    const description = screen.getByLabelText(/Problem Description/);
    const submit = screen.getByRole('button', { name: /add ticket/i });

    await waitFor(async () => {
      expect(screen.getByDisplayValue('mock')).toBeDefined();
      expect(screen.getByDisplayValue('user')).toBeDefined();
      expect(screen.getByDisplayValue('mock@user.com')).toBeDefined();
    });

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

    await waitFor(async () => {
      expect(screen.getByDisplayValue('mock')).toBeDefined();
      expect(screen.getByDisplayValue('user')).toBeDefined();
      expect(screen.getByDisplayValue('mock@user.com')).toBeDefined();
    });

    const subject = screen.getByLabelText(/Subject/);
    const description = screen.getByLabelText(/Problem Description/);
    const submit = screen.getByRole('button', { name: /add ticket/i });

    fireEvent.change(subject, { target: { value: 'test' } });
    fireEvent.change(description, { target: { value: 'test' } });
    fireEvent.click(submit);

    expect(
      await screen.findByText(/There was an error creating your ticket./)
    ).toBeDefined();
    server.resetHandlers();
  });
});
