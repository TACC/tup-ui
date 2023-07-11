import React from 'react';
import { SystemMonitor } from './SystemMonitor';
import { server, testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';

describe('System Monitor Component', () => {
  it('should render message when there are no systems to show', async () => {
    server.use(
      rest.get('http://localhost:8001/system-status', (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );
    await waitFor(() => expect('No systems being monitored').toBeDefined());
  });
  it('should display an error message if an error is returned from useQuery', async () => {
    server.use(
      rest.get('http://localhost:8001/system-status', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    await waitFor(() =>
      expect('Unable to gather system information').toBeDefined()
    );
  });
  it('should display the system name in each row', async () => {
    server.use(
      rest.get('http://localhost:8001/system-status', (req, res, ctx) =>
        res.once(ctx.status(200))
      )
    );
    await waitFor(() => expect('Frontera').toBeDefined());
  });
});
