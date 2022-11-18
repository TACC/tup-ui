import React from 'react';
import SystemMonitor from './SystemMonitor';
import { server, testRender } from '@tacc/tup-testing';
import { getAllByRole, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { rawSystemMonitorOutput } from 'libs/tup-testing/src/mocks/fixtures';

describe('System Monitor Component', () => {
  it('should render message when there are no systems to show', async () => {
    server.use(
      rest.get('http://localhost:8001/system_monitor', (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );
    const { getByText } = testRender(<SystemMonitor />);
    await waitFor(() =>
      expect(getByText('No systems being monitored')).toBeDefined()
    );
  });
  it('should display an error message if an error is returned from useQuery', async () => {
    server.use(
      rest.get('http://localhost:8001/system_monitor', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    const { getByText } = testRender(<SystemMonitor />);
    await waitFor(() =>
      expect(getByText('Unable to gather system information')).toBeDefined()
    );
  });
  it('should display the system name in each row', async () => {
    const { getByText } = testRender(<SystemMonitor />);
    await waitFor(() => expect(getByText('Frontera')).toBeDefined());
    const { debug } = testRender(<SystemMonitor />);
    debug();
  });
});
