import React from 'react';
import { SystemDetails } from './SystemDetails';
import { server, testRender } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { rest } from 'msw';

describe('System Monitor Component', () => {
  it('should display an error message if an error is returned', async () => {
    server.use(
      rest.get('http://localhost:8001/system_monitor/:tas_name', (req, res, ctx) =>
        res.once(ctx.status(404))
      )
    );
    testRender(<SystemDetails />);
    await screen.findAllByText(/System job queues are unavailable/);
  });
  it('should display the headers of the tables', async () => {
    server.use(
        rest.get('http://localhost:8001/system_monitor/:tas_name', (req, res, ctx) =>
          res.once(ctx.status(200))
        )
      );
      const { getByText, getAllByText } = testRender(
        <SystemDetails />)
      await waitFor(() => expect(getByText('System Status')).toBeDefined());
      expect(getByText('Load')).toBeDefined();
      expect(getAllByText('Running Jobs')).toBeDefined();
      expect(getAllByText('Waiting Jobs')).toBeDefined();
      expect(getByText('Queue')).toBeDefined();
      expect(getByText('Status')).toBeDefined();
      expect(getByText('Idle Nodes')).toBeDefined();
    });
});

