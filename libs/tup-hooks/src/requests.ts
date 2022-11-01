import useConfig from './useConfig';
import useJwt from './useJwt';
import axios from 'axios';
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from 'react-query';

type UseGetParams<ResponseType> = {
  endpoint: string;
  key: string;
  options?: Omit<UseQueryOptions<ResponseType, Error>, 'queryKey' | 'queryFn'>;
  baseUrl?: string;
};

export function useGet<ResponseType>({
  endpoint,
  key,
  options = {},
  baseUrl: alternateBaseUrl,
}: UseGetParams<ResponseType>) {
  const client = axios;
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
  const getUtil = async () => {
    const request = await client.get<ResponseType>(
      `${alternateBaseUrl ?? baseUrl}${endpoint}`,
      {
        headers: { 'x-tup-token': jwt ?? '' },
      }
    );
    return request.data;
  };
  return useQuery(key, () => getUtil(), options);
}

type UsePostParams<BodyType, ResponseType> = {
  endpoint: string;
  options?: UseMutationOptions<ResponseType, Error, BodyType>;
  baseUrl?: string;
};

export function usePost<BodyType, ResponseType>({
  endpoint,
  options = {},
  baseUrl: alternateBaseUrl,
}: UsePostParams<BodyType, ResponseType>) {
  const client = axios;
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
  const postUtil = async (body: BodyType) => {
    const response = await client.post<ResponseType>(
      `${alternateBaseUrl ?? baseUrl}${endpoint}`,
      body,
      {
        headers: { 'x-tup-token': jwt ?? '' },
      }
    );
    return response.data;
  };
  const mutation = useMutation(async (body: BodyType) => {
    const response = await postUtil(body);
    return response;
  }, options);
  return mutation;
}
