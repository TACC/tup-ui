import { rest } from 'msw';
import { mockProfile, mockJwt } from './fixtures';

export const handlers = [
  rest.get('http://localhost:8000/auth/profile', (req, res, ctx) => {
    // Respond with a TAS user profile
    return res(ctx.json(mockProfile));
  }),
  rest.post('http://localhost:8000/auth', (req, res, ctx) => {
    // Respond with a valid jwt
    return res(ctx.json(mockJwt));
  }),
];
