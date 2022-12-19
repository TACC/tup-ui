import React from 'react';
import { ProjectsSummaryListing } from './ProjectsSummaryListing';
import { server, testRender } from '@tacc/tup-testing';
import { screen } from '@testing-library/react';
import { rest } from 'msw';

describe('Projects Summary Listing Component', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<ProjectsSummaryListing />);
    expect(getByTestId('loading-spinner')).toBeDefined();
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
