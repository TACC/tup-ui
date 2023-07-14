import React from 'react';
import { SystemMonitor } from './SystemMonitor';
import { server, testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { rest } from 'msw';

describe('System Monitor Component', () => {
  it('should display an error message if an error is returned', async () => {
    server.use(
      rest.get('http://localhost:8001/system_monitor', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    testRender(<SystemMonitor />);
    await screen.findAllByText(/Unable to gather system information/);
  });
  it('should display the title of table on dashboard', async () => {
    const { getByTestId, getByText } = testRender(
      <SystemMonitor />
      );
      await waitFor(() => expect(getByTestId('loading-spinner')).toBeDefined());
      expect(getByText(/System Status/)).toBeDefined();
    });
});

