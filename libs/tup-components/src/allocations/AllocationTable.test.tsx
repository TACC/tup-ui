import React from 'react';
import { AllocationsTable } from './AllocationTable';
import { server, testRender } from '@tacc/tup-testing';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('Projects Allocation Table', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<AllocationsTable />);
    expect(getByTestId('loading-spinner')).toBeDefined();
  });
  it('should display an error message if an error is returned', async () => {
    server.use(
      rest.get('http://localhost:8001/projects', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    testRender(<AllocationsTable />);
    await screen.findAllByText(/Unable to retrieve allocation information./);
  });
  it('should display project allocation information', async () => {
    const { getByText, getByTestId, getAllByRole } = testRender(
      <AllocationsTable />
    );
    await waitFor(() => getAllByRole('columnheader'));
    const columnHeaders: HTMLElement[] = getAllByRole('columnheader');
    expect(columnHeaders[0].textContent).toEqual('Active Resources');
    expect(columnHeaders[1].textContent).toEqual('Awarded');
    expect(columnHeaders[2].textContent).toEqual('Used');
    expect(columnHeaders[3].textContent).toEqual('Expires');
    expect(getByText('Lonestar6')).toBeDefined();
    expect(getByText('10')).toBeDefined();
    expect(getByText('0')).toBeDefined();
    expect(getByText('09/30/2023')).toBeDefined();
  });
});