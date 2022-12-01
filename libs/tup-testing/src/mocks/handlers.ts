import { rest } from 'msw';
import {
  mockProfile,
  mockJwt,
  rawSystemMonitorOutput,
  mockTickets,
  mockTicketDetails,
  mockTicketHistory,
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
  rest.get('http://localhost:8001/tickets', (req, res, ctx) => {
    // Respond with mock tickets output
    return res(ctx.json(mockTickets));
  }),
  rest.get('http://localhost:8001/tickets/85411/history', (req, res, ctx) => {
    // Respond with mock ticket history output
    return res(ctx.json(mockTicketHistory));
  }),
  rest.get('http://localhost:8001/tickets/85411', (req, res, ctx) => {
    // Respond with mock ticket details output
    return res(ctx.json(mockTicketDetails));
  }),
  rest.post('http://localhost:8001/tickets/85411/reply', (req, res, ctx) => {
    // Respond with true
    return res(ctx.json(true));
  }),
  rest.post('http://localhost:8001/tickets', (req, res, ctx) => {
    // Respond with a mock created ticket id
    return res(ctx.json('12345'));
  }),
];
