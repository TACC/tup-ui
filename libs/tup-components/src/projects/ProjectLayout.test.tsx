import React from 'react';
import { ProjectsTable } from './ProjectsTable';
import { ProjectHeader } from './ProjectHeader';
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
    expect(columnHeaders[1].textContent).toEqual('Principle Investigator');
    expect(columnHeaders[2].textContent).toEqual('Active Allocations');
    expect(getByText('JAR TUP Development Project')).toBeDefined();
    expect(getByText('Jake Rosenberg')).toBeDefined();
    expect(getByText('Lonestar6')).toBeDefined();
  });
  it('should display the projects detail header', async () => {
    testRender(<ProjectHeader projectId={59184} />);
    await screen.findByText(/JAR TUP Development Project/);
    await screen.findByText(/Project Charge Code: STA22002/);
    await screen.findByText(/Field of Science: placeholder/);
    await screen.findByText(/Unix Group: placeholder/);
  });
  it('should have a link in the projects detail header', async () => {
    testRender(<ProjectHeader projectId={59184} />);
    const dataQuery = await screen.findByText(/Active Projects/);
    const link = dataQuery.closest('a') as HTMLElement;
    const linkQuery = within(link);
    expect(linkQuery.getByText('Active Projects')).toBeDefined();
  });
});
