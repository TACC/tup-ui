import { render, screen } from '@testing-library/react';
import { AxiosStatic } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AxiosClientContext} from './useAxios';
import { useGet } from './requests';
import useJwt from './useJwt';

jest.mock('./useJwt');

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
    (useJwt as jest.Mock).mockReturnValue({
      jwt: "abc123",
      isLoading: false,
      error: null
    })
    jest
      .spyOn(mockedAxios, 'get')
      .mockResolvedValue({ data: "response" });

    render(<WrappedGet />);

    const responseQuery = await screen.findByText(/response/);
    expect(responseQuery).toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/endpoint', { headers: {'x-tup-token': 'abc123'}})
  });
});
