import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { AxiosStatic } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoginComponent, {
  ProfileComponent,
  AxiosClientContext,
} from './LoginComponent';

const mockedAxios = jest.createMockFromModule<AxiosStatic>('axios');
const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, cacheTime: Infinity } },
});
const WrappedProfileComponent = () => (
  <AxiosClientContext.Provider value={mockedAxios}>
    <QueryClientProvider client={testQueryClient}>
      <ProfileComponent />
    </QueryClientProvider>
  </AxiosClientContext.Provider>
);

const WrappedLogin = () => (
  <AxiosClientContext.Provider value={mockedAxios}>
    <QueryClientProvider client={testQueryClient}>
      <LoginComponent />
    </QueryClientProvider>
  </AxiosClientContext.Provider>
);

describe('LoginComponent', () => {
  it('should render profile if cookie is defined', async () => {
    document.cookie = 'x-tup-token=abc123';
    jest
      .spyOn(mockedAxios, 'get')
      .mockResolvedValue({ data: { firstName: 'testuser' } });

    render(<WrappedLogin />);

    await waitFor(() => {
      const cookieQuery = screen.getByText(/User Profile/);
      expect(cookieQuery).toBeTruthy();
      cleanup();
    });
  });

  it('should render login page if no cookie is set', async () => {
    document.cookie = 'x-tup-token=';

    render(<WrappedLogin />);

    await waitFor(() => {
      const cookieQuery = screen.getByText(/Login/);
      expect(cookieQuery).toBeTruthy();
    });
  });
});

describe('ProfileComponent', () => {
  it('should render successfully', async () => {
    jest
      .spyOn(mockedAxios, 'get')
      .mockResolvedValue({ data: { firstName: 'testuser' } });

    render(<WrappedProfileComponent />);
    expect(mockedAxios.get).toHaveBeenCalled();
    const userQuery = await screen.findByText(/testuser/);
    expect(userQuery).toBeTruthy();
    //cleanup();
  });
});
