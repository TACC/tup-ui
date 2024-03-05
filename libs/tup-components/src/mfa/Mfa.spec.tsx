import React from 'react';
import MfaWrapper from './MfaWrapper';
import { testRender, server } from '@tacc/tup-testing';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { enrolledToken } from '@tacc/tup-testing';

describe('MFA Pairing component', () => {
  it('Should render selections if token is unenrolled.', async () => {
    testRender(<MfaWrapper>Pairing View</MfaWrapper>);
    expect(await screen.findByText('Pairing View')).toBeDefined();
  });

  it('Should render selections if no token exists', async () => {
    server.use(
      rest.get('http://localhost:8001/mfa', (req, res, ctx) => {
        return res.once(ctx.json({ token: null }));
      })
    );
    testRender(<MfaWrapper>Pairing View</MfaWrapper>);
    expect(await screen.findByText('Pairing View')).toBeDefined();
  });

  it('Should render a success view if a token is enrolled', async () => {
    server.use(
      rest.get('http://localhost:8001/mfa', (req, res, ctx) => {
        return res.once(ctx.json(enrolledToken));
      })
    );
    testRender(<MfaWrapper>Pairing View</MfaWrapper>);
    expect(await screen.findByText(/Pairing successful/)).toBeDefined();
    expect(screen.queryByText('Pairing view')).toBeNull();
  });
});
