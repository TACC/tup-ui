import { rest } from 'msw';
import {
  mockProfile,
  mockJwt,
  rawSystemMonitorOutput,
  mockProjectsOutput,
  mockProjectUsage,
  MockProjectUsers,
  mockTickets,
  mockProjectFieldOfScience,
  mockTicketDetails,
  mockTicketHistory,
  unverifiedToken,
  mockUserSearchResult,
} from './fixtures';
import { mockProjectGrants, mockProjectPubs } from './fixtures/projects';

export const handlers = [
  rest.get('http://localhost:8001/users/profile', (req, res, ctx) => {
    // Respond with a TAS user profile
    return res(ctx.json(mockProfile));
  }),
  rest.post('http://localhost:8001/auth', (req, res, ctx) => {
    // Respond with a valid jwt
    return res(ctx.json(mockJwt));
  }),
  rest.get('http://localhost:8001/system_monitor', (req, res, ctx) => {
    // Respond with mock system monitor output
    return res(ctx.json(rawSystemMonitorOutput));
  }),
  rest.get('http://localhost:8001/projects', (req, res, ctx) => {
    // Respond with mock active projects output
    return res(ctx.json(mockProjectsOutput));
  }),

  rest.get('http://localhost:8001/users/search', (req, res, ctx) => {
    // Respond with mock active projects output
    return res(ctx.json(mockUserSearchResult));
  }),
  rest.get(
    'http://localhost:8001/projects/:projectId/publications',
    (req, res, ctx) => {
      // Respond with mock active projects output
      return res(ctx.json(mockProjectPubs));
    }
  ),
  rest.get(
    'http://localhost:8001/projects/:projectId/grants',
    (req, res, ctx) => {
      // Respond with mock active projects output
      return res(ctx.json(mockProjectGrants));
    }
  ),
  rest.get(
    'http://localhost:8001/projects/:projectId/users',
    (req, res, ctx) => {
      // Respond with mock users output
      return res(ctx.json(MockProjectUsers));
    }
  ),
  rest.get(
    'http://localhost:8001/projects/:projectId/allocations/:allocationId/usage',
    (req, res, ctx) => {
      // Respond with mock usage output
      return res(ctx.json(mockProjectUsage));
    }
  ),
  rest.get('http://localhost:8001/tickets', (req, res, ctx) => {
    // Respond with mock tickets output
    return res(ctx.json(mockTickets));
  }),
  rest.get('http://localhost:8001/projects/fields', (req, res, ctx) => {
    // Respond with mock tickets output
    return res(ctx.json(mockProjectFieldOfScience));
  }),
  rest.get(
    'http://localhost:8001/tickets/:ticketId/history',
    (req, res, ctx) => {
      // Respond with mock ticket history output
      return res(ctx.json(mockTicketHistory));
    }
  ),
  rest.get('http://localhost:8001/tickets/:ticketId', (req, res, ctx) => {
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
  // MFA
  rest.get('http://localhost:8001/mfa', (req, res, ctx) => {
    // Respond with an un-enrolled token by default
    return res(ctx.json(unverifiedToken));
  }),
];
