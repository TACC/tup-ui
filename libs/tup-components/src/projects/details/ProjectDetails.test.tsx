import ProjectDetails from './ProjectDetails';
import { testRender } from '@tacc/tup-testing';
import { screen } from '@testing-library/react';

describe('Project Details Component', () => {
  it('should display a spinner while loading', async () => {
    const { getByTestId } = testRender(<ProjectDetails projectId={59184} />);
    expect(getByTestId('loading-spinner')).toBeDefined();
    await screen.findByText(
      'Development project for testing PI-specific endpoints in the redesigned user portal.'
    );
  });
  it('should display the projects description/abstract, publications, and grants', async () => {
    testRender(<ProjectDetails projectId={59184} />);
    await screen.findByText(
      /Development project for testing PI-specific endpoints in the redesigned user portal./
    );
    await screen.findByText(/This project has no publications./);
    await screen.findByText(/This project has no grants./);
  });
});
