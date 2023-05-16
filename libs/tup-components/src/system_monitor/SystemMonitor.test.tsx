import React from 'react';
import { SystemMonitorTable, SystemMonitor } from './SystemMonitor';
import { server, testRender } from '@tacc/tup-testing';
import { getAllByText, waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('System Monitor Component', () => {
  it('should render message when there are no systems to show', async () => {
    server.use(
      rest.get('http://localhost:8001/system_monitor', (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );
    const { getByText } = testRender(<SystemMonitorTable />);
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
    const { getByText } = testRender(<SystemMonitorTable />);
    await waitFor(() =>
      expect(getByText('Unable to gather system information')).toBeDefined()
    );
  });
  it('should display the system name in each row', async () => {
    const { getByText } = testRender(<SystemMonitorTable />);
    await waitFor(() => expect(getByText('Frontera')).toBeDefined());
  });
});
