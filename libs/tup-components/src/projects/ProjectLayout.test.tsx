import React from 'react';
import { ProjectsTable } from './ProjectsTable';
import { testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { screen, within } from '@testing-library/react';

describe('Projects Layout Component', () => {
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
