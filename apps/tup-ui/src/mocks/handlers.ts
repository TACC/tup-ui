import { rest } from 'msw';
import { mockProfile } from './fixtures';

export const handlers = [
  rest.get('http://localhost:8000/auth/profile', (req, res, ctx) => {
    // Respond with a TAS user profile
    return res(ctx.json(mockProfile));
  }),
];
