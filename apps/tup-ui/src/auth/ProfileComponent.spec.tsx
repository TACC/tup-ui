import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor } from '@testing-library/react'
import ProfileComponent from './ProfileComponent';
import mockProfile from '../fixtures/profile';
import { testQueryClient, getTestWrapper } from '../utils'

const server = setupServer(
  rest.get('http://localhost:8000/auth/profile', (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
    return res(ctx.json(mockProfile))
  }),
)

const Wrapper = getTestWrapper(testQueryClient);

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('ProfileComponent', () => {
  afterEach(() => {
    testQueryClient.clear()
  })
  it('should render a user profile', async () => {
    const { getAllByText } = render(<Wrapper><ProfileComponent /></Wrapper>);
    await waitFor(() => expect(getAllByText(/mock user/).length).toEqual(1));
  });
});
