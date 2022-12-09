import React from 'react';
import Tickets from './Tickets';
import { testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { get } from 'js-cookie';

jest.mock('js-cookie');

describe('Tickets Component', () => {
  beforeEach(() => {
    (get as jest.Mock).mockReturnValue('badjwt');
  });
  it('should render SectionTableWrapper and Table components', async () => {
    const { getByText } = testRender(<Tickets />);
    await waitFor(() => expect(getByText('Subject')).toBeDefined());
    expect(getByText('+ New Ticket')).toBeDefined();
    expect(getByText('Tickets')).toBeDefined();
    expect(getByText('Ticket Status')).toBeDefined();
  });
});
