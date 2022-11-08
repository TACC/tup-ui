import React from 'react';
import ActiveProjects from './ActiveProjects';
import { testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';

describe('Active Projects Component', () => {
  it('display a no-projectss message when there is no active projects', async () => {
    const { getByText } = testRender(<ActiveProjects hosts={[]} />);
    await waitFor(() =>
      expect(getByText('No active projects')).toBeDefined()
    );
  });
  it('should display the project name in each row', async () => {
    const { getByText } = testRender(<ActiveProjects />);
    await waitFor(() => expect(getByText('Project1')).toBeDefined());
  });
});
