import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { AxiosStatic } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AxiosClientContext} from './useAxios';
import { useGet, usePost } from './requests';
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

const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <AxiosClientContext.Provider value={mockedAxios}>
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  </AxiosClientContext.Provider>
);

const MockPostComponent: React.FC = () => {
  const { data, isLoading, mutate, error } = usePost<string, string>("/endpoint");
  useEffect(
    () => {
      mutate("body")
    },
    [ mutate ]
  )
  if (error) {
    return <div>Error</div>
  }
  if (isLoading) {
    return <div>Loading</div>
  }
  return <div>{data}</div>
}

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

    render(<Wrapper><MockGetComponent/></Wrapper>);

    const responseQuery = await screen.findByText(/response/);
    expect(responseQuery).toBeTruthy();
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8000/endpoint', { headers: {'x-tup-token': 'abc123'}})
  });
  it('should render the mock post component', async () => {
    (useJwt as jest.Mock).mockReturnValue({
      jwt: "abc123",
      isLoading: false,
      error: null
    })
    jest
      .spyOn(mockedAxios, 'post')
      .mockResolvedValue({ data: "response" });

    render(<Wrapper><MockPostComponent/></Wrapper>);

    const responseQuery = await screen.findByText(/response/);
    expect(responseQuery).toBeTruthy();
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:8000/endpoint', "body", { headers: {'x-tup-token': 'abc123'}})
  });
});
