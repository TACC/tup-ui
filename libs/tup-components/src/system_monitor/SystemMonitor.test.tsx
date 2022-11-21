import React from 'react';
import { isSystemDown, SystemMonitor} from './SystemMonitor';
import { server, testRender, TestWrapper } from '@tacc/tup-testing';
import { waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { useTable } from 'react-table';
import { rawSystemMonitorOutput } from 'libs/tup-testing/src/mocks/fixtures';
import { useSystemMonitor } from '@tacc/tup-hooks';

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
  it('should render Maintenance if system is not online, not reachable, has queues down or in maintenance', async () => {
    server.use(
      rest.get('http://localhost:8001/system_monitor', (req, res, ctx) => {
        return res.once(ctx.json({online : false, reachable : false, queues_down : true, in_maintenance : true}));
      })
    );
    const SystemMonitor = ({testRender(<SystemMonitor />);
    await waitFor(() => 
      expect(getAllByText("Maintenance")).toBeDefined());
  });
});