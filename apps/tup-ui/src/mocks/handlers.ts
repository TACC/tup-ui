import { rest } from 'msw';
import { mockProfile } from './fixtures';

export const handlers = [
  rest.get('http://localhost:8000/auth/profile', (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
    return res(ctx.json(mockProfile))
  }),
]