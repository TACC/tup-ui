import { server } from './src/mocks/server';
import { testQueryClient } from './src/utils';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  testQueryClient.clear();
});
beforeEach(() => {
  testQueryClient.clear();
});
// Clean up after the tests are finished.
afterAll(() => server.close());
