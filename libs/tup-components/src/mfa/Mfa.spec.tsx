import React from 'react';
import MfaView from './Mfa';
import { testRender, server } from '@tacc/tup-testing';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { enrolledToken } from '@tacc/tup-testing';

describe('MFA Pairing component', () => {
  it('Should render selections if token is unenrolled.', async () => {
    const { getByText } = testRender(<MfaView />);
    await waitFor(() => {
      expect(getByText('Token App')).toBeDefined();
      expect(getByText('SMS Text')).toBeDefined();
    });
  });

  it('Should render selections if no token exists', async () => {
    server.use(
      rest.get('http://localhost:8001/mfa', (req, res, ctx) => {
        return res.once(ctx.json({ token: null }));
      })
    );
    const { getByText } = testRender(<MfaView />);
    await waitFor(() => {
      expect(getByText('Token App')).toBeDefined();
      expect(getByText('SMS Text')).toBeDefined();
    });
  });

  it('Should render a success view if a token is enrolled', async () => {
    server.use(
      rest.get('http://localhost:8001/mfa', (req, res, ctx) => {
        return res.once(ctx.json(enrolledToken));
      })
    );
    const { getByText } = testRender(<MfaView />);
    await waitFor(() => {
      expect(getByText(/Pairing Successful/)).toBeDefined();
    });
  });
});
