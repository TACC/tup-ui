import ProjectDetails from './ProjectDetails';
import { testRender } from '@tacc/tup-testing';
import { screen, waitFor } from '@testing-library/react';

describe('Project Details Component', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<ProjectDetails projectId={59184} />);
    expect(getByTestId('loading-spinner')).toBeDefined();
  });
  it('should display the projects table', async () => {
    const { getByText, getByTestId, getAllByRole } = testRender(
      <ProjectDetails projectId={59184} />
    );
    expect(getByTestId('loading-spinner')).toBeDefined();
    await waitFor(() => getAllByRole('columnheader'));
    const columnHeaders: HTMLElement[] = getAllByRole('columnheader');
    expect(columnHeaders[0].textContent).toEqual('Systems');
    expect(columnHeaders[1].textContent).toEqual('Awarded');
    expect(columnHeaders[2].textContent).toEqual('Used');
    expect(columnHeaders[3].textContent).toEqual('Status');
    expect(columnHeaders[4].textContent).toEqual('Expires');
    expect(getByText('Lonestar6')).toBeDefined();
    expect(getByText('10 SU')).toBeDefined();
    expect(getByText('0 SU')).toBeDefined();
    expect(getByText('9/30/2023')).toBeDefined();
  });
  it.skip('should display the projects publications, and abstract/grants', async () => {
    testRender(<ProjectDetails projectId={59184} />);
    await screen.findByText(/This project has no publications./);
    await screen.findByText(
      /If your allocation was awarded through ACCESS, it can be managed in the ACCESS portal/
    );
  });
});
