import { rest } from 'msw';
import { mockProfile, mockJwt, rawSystemMonitorOutput } from './fixtures';

export const handlers = [
  rest.get('http://localhost/auth/profile', (req, res, ctx) => {
    // Respond with a TAS user profile
    return res(ctx.json(mockProfile));
  }),
  rest.post('http://localhost/auth', (req, res, ctx) => {
    // Respond with a valid jwt
    return res(ctx.json(mockJwt));
  }),
  rest.get('http://localhost/sysmon', (req, res, ctx) => {
    // Respond with mock system monitor output
    return res(ctx.json(rawSystemMonitorOutput));
  }),
];
