import { rest } from 'msw';
import {
  mockProfile,
  mockJwt,
  rawSystemMonitorOutput,
  mockTickets,
} from './fixtures';

export const handlers = [
  rest.get('http://localhost:8001/users/profile', (req, res, ctx) => {
    // Respond with a TAS user profile
    return res(ctx.json(mockProfile));
  }),
  rest.post('http://localhost:8001/auth', (req, res, ctx) => {
    // Respond with a valid jwt
    return res(ctx.json(mockJwt));
  }),
  rest.get('http://localhost:8001/sysmon', (req, res, ctx) => {
    // Respond with mock system monitor output
    return res(ctx.json(rawSystemMonitorOutput));
  }),
  rest.get('http://localhost:8001/activeprojects', (req, res, ctx) => {
    // Respond with mock active projects output
    return res(ctx.json(rawActiveProjectsOutput));
  }),
  rest.get('http://localhost:8001/tickets', (req, res, ctx) => {
    // Respond with mock tickets output
    return res(ctx.json(mockTickets));
  }),
];
