import React from 'react';
import { ProjectsTable } from './ProjectsTable';
import { server, testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('Projects Table Component', () => {
  it('should render message when there are no projects to show', async () => {
    server.use(
      rest.get('http://localhost:8001/projects', (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );
    const { getByText } = testRender(<ProjectsTable />);
    await waitFor(() =>
      expect(getByText('No projects or allocations found.')).toBeDefined());
  });

  it('should display the projects table', async () => {
    const { getByText, getByTestId, getAllByRole } = testRender(
      <ProjectsTable />
    );
    expect(getByTestId('loading-spinner')).toBeDefined();
    await waitFor(() => getAllByRole('columnheader'));
    const columnHeaders: HTMLElement[] = getAllByRole('columnheader');
    expect(columnHeaders[0].textContent).toEqual('Project Title');
    expect(columnHeaders[1].textContent).toEqual('Principal Investigator');
    expect(columnHeaders[2].textContent).toEqual('Active Allocations');
    expect(getByText('JAR TUP Development Project')).toBeDefined();
    expect(getByText('Jake Rosenberg')).toBeDefined();
    expect(getByText('Lonestar6')).toBeDefined();
  });
});
