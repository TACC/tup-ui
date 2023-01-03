import React from 'react';
import { ProjectsSummaryListing } from './ProjectsSummaryListing';
import { server, testRender } from '@tacc/tup-testing';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('Projects Summary Listing Component', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<ProjectsSummaryListing />);
    expect(getByTestId('loading-spinner')).toBeDefined();
    await screen.findByText('JAR TUP Development Project');
  });
  it('should display an error message if an error is returned', async () => {
    server.use(
      rest.get('http://localhost:8001/projects', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    testRender(<ProjectsSummaryListing />);
    await screen.findAllByText(/Unable to retrieve projects/);
  });
  it('should display project summary', async () => {
    testRender(<ProjectsSummaryListing />);
    await screen.findByText('JAR TUP Development Project');
    expect(screen.findAllByText('/projects/59184', { exact: false }));
    expect(screen.findAllByText('Project Charge Code: STA22002'));
    expect(screen.findAllByText('Principle Investigator: Jake Rosenberg'));
    expect(screen.getAllByText('Compute: 10 SUs'));
    expect(screen.getAllByText('(0% Used)'));
    expect(screen.getAllByText('Storage: -- GBs'));
  });
});

describe('Projects Allocation Table', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<ProjectsSummaryListing />);
    expect(getByTestId('loading-spinner')).toBeDefined();
  });
  it('should display project allocation information', async () => {
    const { getByText, getByTestId, getAllByRole } = testRender(
      <ProjectsSummaryListing />
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
