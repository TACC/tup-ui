import React from 'react';
import { ProjectsListing } from './ProjectsListing';
import { server, testRender } from '@tacc/tup-testing';
import { screen } from '@testing-library/react';
import { rest } from 'msw';

describe('Projects Summary Listing Component', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<ProjectsListing />);
    expect(getByTestId('loading-spinner')).toBeDefined();
    await screen.findByText('JAR TUP Development Project');
  });
  it('should display an error message if an error is returned', async () => {
    server.use(
      rest.get('http://localhost:8001/projects', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    testRender(<ProjectsListing />);
    await screen.findAllByText(/Unable to retrieve projects/);
  });
  it('should display project summary', async () => {
    testRender(<ProjectsListing />);
    // Project summary
    await screen.findByText('JAR TUP Development Project');
    expect(screen.findAllByText('/projects/59184', { exact: false }));
    expect(screen.findAllByText('Project Charge Code: STA22002'));
    expect(screen.findAllByText('Principal Investigator: Jake Rosenberg'));
    expect(screen.getAllByText('10 SUs'));
    expect(screen.getAllByText('(0% Used)'));
    expect(screen.getAllByText('-- GBs'));

    // Allocations table
    expect(screen.getAllByText('10 SU'));
    expect(screen.getAllByText('9/6/2023'));
  });
});
