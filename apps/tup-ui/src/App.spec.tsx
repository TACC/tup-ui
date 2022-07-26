import { render, screen } from '@testing-library/react';
import { getTestWrapper, testQueryClient } from './utils';
import { useJwt } from './hooks';

import App from './App';

const Wrapper = getTestWrapper(testQueryClient);

jest.mock('./hooks/useJwt');

describe('App', () => {
  beforeEach(() => {
    testQueryClient.clear();
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'x-tup-token=abc123',
    });
  });
  afterEach(() => {
    document.cookie = 'x-tup-token=';
    testQueryClient.clear();
  });

  it('should route to user profile when a JWT cookie is present', async () => {
    //document.cookie = 'x-tup-token=abc123';

    (useJwt as jest.Mock).mockReturnValue({
      jwt: 'abc123',
      isLoading: false,
    });

    render(
      <Wrapper>
        <App />
      </Wrapper>
    );
    //screen.debug();
    expect(await screen.findByText(/mock/)).toBeDefined();
  });

  it('should route to login page when no JWT cookie is present', async () => {
    (useJwt as jest.Mock).mockReturnValue({
      jwt: undefined,
      isLoading: false,
    });
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'x-tup-token=',
    });
    render(
      <Wrapper>
        <App />
      </Wrapper>
    );

    expect(await screen.findByText(/Login/)).toBeDefined();
  });
});
