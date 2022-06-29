import { render, screen } from '@testing-library/react';
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
  afterEach(() => testQueryClient.clear());
  it('should render profile if cookie is defined', async () => {
    document.cookie = 'x-tup-token=abc123';
    jest
      .spyOn(mockedAxios, 'get')
      .mockResolvedValue({ data: { firstName: 'testuser' } });
    render(<WrappedLogin />);

    const userQuery = await screen.findByText(/testuser/);
    expect(userQuery).toBeTruthy();
  });

  it('should render login page if no cookie is set', async () => {
    document.cookie = 'x-tup-token=';

    render(<WrappedLogin />);

    const userQuery = await screen.findByText(/Login/);
    expect(userQuery).toBeTruthy();
  });
});

describe('ProfileComponent', () => {
  afterEach(() => testQueryClient.clear());
  it('should render successfully', async () => {
    jest
      .spyOn(mockedAxios, 'get')
      .mockResolvedValue({ data: { firstName: 'testuser' } });

    render(<WrappedProfileComponent />);
    expect(mockedAxios.get).toHaveBeenCalled();
    const userQuery = await screen.findByText(/testuser/);
    expect(userQuery).toBeTruthy();
  });
});
