import React from 'react';
import { TicketCreateForm } from './TicketCreateForm';
import { server, testRender } from '@tacc/tup-testing';
import { act, fireEvent, getByTestId, waitFor } from '@testing-library/react';
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
  it('should render form with authenticated user information', async () => {
    const { getByText, getByDisplayValue, getByRole } = testRender(
      <TicketCreateForm profile={mockAuthenticatedUser} />
    );
    const submit = getByRole('button', { name: /add ticket/i });
    await act(async () => {
      fireEvent.click(submit);
    });
    expect(getByDisplayValue('Max')).toBeDefined();
    expect(getByDisplayValue('Munstermann')).toBeDefined();
    expect(
      getByDisplayValue('max.munstermann@austin.utexas.edu')
    ).toBeDefined();
    expect(getByText(/Explain your steps/)).toBeDefined();
  });
  it('should render form for un-authenticated user', async () => {
    const { getByText, getByRole } = testRender(<TicketCreateForm />);
    const submit = getByRole('button', { name: /add ticket/i });
    await act(async () => {
      fireEvent.click(submit);
    });
    expect(getByText(/Explain your steps/)).toBeDefined();
  });
  it('should render a ticket create ID upon success', async () => {
    const { getByLabelText, getByText, getByRole } = testRender(
      <TicketCreateForm profile={mockAuthenticatedUser} />
    );
    const subject = getByLabelText(/Subject/);
    const description = getByLabelText(/Problem Description/);
    const submit = getByRole('button', { name: /add ticket/i });
    await act(async () => {
      fireEvent.change(subject, { target: { value: 'test' } });
      fireEvent.change(description, { target: { value: 'test' } });
      fireEvent.click(submit);
    });
    await waitFor(() => expect(getByText(/12345/)).toBeDefined());
  });
  it('should display an error message if an error is returned from useMutation hook', async () => {
    server.use(
      rest.post('http://localhost:8001/tickets', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    const { getByLabelText, getByText, getByRole } = testRender(
      <TicketCreateForm profile={mockAuthenticatedUser} />
    );
    const subject = getByLabelText(/Subject/);
    const description = getByLabelText(/Problem Description/);
    const submit = getByRole('button', { name: /add ticket/i });
    await act(async () => {
      fireEvent.change(subject, { target: { value: 'test' } });
      fireEvent.change(description, { target: { value: 'test' } });
      fireEvent.click(submit);
    });
    await waitFor(() =>
      expect(getByText(/Request failed with status code 404/)).toBeDefined()
    );
  });
});
