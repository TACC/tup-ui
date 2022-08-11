import { screen } from '@testing-library/react';
import { useJwt } from './hooks';
import { testRender } from './utils';
import { LoginComponent } from './components/auth';
import App from './App';

jest.mock('./hooks/useJwt');
jest.mock('./components/auth');

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'x-tup-token=abc123',
    });
  });
  afterEach(() => {
    document.cookie = 'x-tup-token=';
  });

  it('should route to user profile when a JWT cookie is present', async () => {
    //document.cookie = 'x-tup-token=abc123';

    (useJwt as jest.Mock).mockReturnValue({
      jwt: 'abc123',
      isLoading: false,
    });

    testRender(<App />);
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
    (LoginComponent as jest.Mock).mockReturnValue(<div>Login</div>);
    testRender(<App />);
    expect(await screen.findByText(/Login/)).toBeDefined();
  });
});
