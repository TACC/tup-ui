import React from 'react';
import { FeedbackModal } from './';
import { server, testRender } from '@tacc/tup-testing';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { get } from 'js-cookie';

jest.mock('js-cookie');
const setIsModalOpen = jest.fn;

describe('FeedbackModal Component', () => {
  it('should render a ticket ID upon success for an authenticated user', async () => {
    (get as jest.Mock).mockReturnValue('jwt');
    const { getByLabelText, getByText, getByRole } = testRender(
      <FeedbackModal setIsModalOpen={setIsModalOpen} />
    );
    const description = getByLabelText(/Feedback/);
    const submit = getByRole('button', { name: /submit/i });
    await act(async () => {
      fireEvent.change(description, { target: { value: 'test' } });
      fireEvent.click(submit);
    });
    await waitFor(() => expect(getByText(/12345/)).toBeDefined());
  });
  it('should render a ticket ID upon success for a non-authenticated user', async () => {
    (get as jest.Mock).mockReturnValue(undefined);
    const { getByLabelText, getByText, getByRole } = testRender(
      <FeedbackModal setIsModalOpen={setIsModalOpen} />
    );
    const description = getByLabelText(/Feedback/);
    const submit = getByRole('button', { name: /submit/i });
    await act(async () => {
      fireEvent.change(description, { target: { value: 'test' } });
      fireEvent.click(submit);
    });
    await waitFor(() => expect(getByText(/6789/)).toBeDefined());
  });
  it('should display an error message if an error is returned from useMutation hook', async () => {
    (get as jest.Mock).mockReturnValue('jwt');
    server.use(
      rest.post('http://localhost:8001/tickets', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    const { getByLabelText, getByText, getByRole } = testRender(
      <FeedbackModal setIsModalOpen={setIsModalOpen} />
    );
    const description = getByLabelText(/Feedback/);
    const submit = getByRole('button', { name: /submit/i });
    await act(async () => {
      fireEvent.change(description, { target: { value: 'test' } });
      fireEvent.click(submit);
    });
    await waitFor(() =>
      expect(getByText(/Request failed with status code 404/)).toBeDefined()
    );
  });
});
