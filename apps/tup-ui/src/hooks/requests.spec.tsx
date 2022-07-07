import { render, screen } from '@testing-library/react';
import { AxiosStatic } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGet } from './requests';

import { AxiosClientContext } from '../hooks/useAxios';

const MockGetComponent: React.FC = () => {
  const { data, isLoading, error } = useGet<string>("/endpoint", "key");
  if (error) {
    return <div>Error</div>
  }
  if (isLoading) {
    return <div>Loading</div>
  }
  return <div>{data}</div>
}

const mockedAxios = jest.createMockFromModule<AxiosStatic>('axios');
const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, cacheTime: Infinity } },
});

const WrappedGet = () => (
  <AxiosClientContext.Provider value={mockedAxios}>
    <QueryClientProvider client={testQueryClient}>
      <MockGetComponent />
    </QueryClientProvider>
  </AxiosClientContext.Provider>
);

describe('requests', () => {
  afterEach(() => testQueryClient.clear());
  it('should render the mock get component', async () => {
    document.cookie = 'x-tup-token=abc123';
    jest
      .spyOn(mockedAxios, 'get')
      .mockResolvedValue({ data: "response" });
    render(<WrappedGet />);

    const responseQuery = await screen.findByText(/response/);
    expect(responseQuery).toBeTruthy();
  });
  it('should an error if a JWT is not set', async () => {
    document.cookie = 'x-tup-token=';

    render(<WrappedGet />);

    const errorQuery = await screen.findByText(/Error/);
    expect(errorQuery).toBeTruthy();
  });
});
/*
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
*/