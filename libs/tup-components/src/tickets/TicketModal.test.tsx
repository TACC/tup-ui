import React from 'react';
import TicketModal from './TicketModal';
import { server, testRender } from '@tacc/tup-testing';
import {
  act,
  fireEvent,
  getByTestId,
  getByText,
  waitFor,
} from '@testing-library/react';
import { rest } from 'msw';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    ticketId: '85411',
  }),
}));
describe('Ticket Modal', () => {
  it('should render ticket history information and reply form', async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {
      return;
    };
    const { getByText, getAllByText } = testRender(<TicketModal />);
    await waitFor(() =>
      expect(getAllByText('test; please ignore').length).toEqual(2)
    );
    expect(getByText('Ticket 85411')).toBeDefined();
    expect(getByText('testFile.txt (10b)')).toBeDefined();
  });
});
