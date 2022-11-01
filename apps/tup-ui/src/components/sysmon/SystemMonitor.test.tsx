import React from 'react';
import SystemMonitor from './SystemMonitor';
import { testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';

describe('System Monitor Component', () => {
  it('display a no-systems message when there is no data', async () => {
    const { getByText } = testRender(<SystemMonitor hosts={[]} />);
    await waitFor(() =>
      expect(getByText('No systems being monitored')).toBeDefined()
    );
  });
  it('should display the system name in each row', async () => {
    const { getByText } = testRender(<SystemMonitor />);
    await waitFor(() => expect(getByText('Frontera')).toBeDefined());
  });
});
