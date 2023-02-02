import { server, testQueryClient } from '@tacc/tup-testing';
import { beforeAll, afterEach, beforeEach, afterAll } from 'vitest';

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
