import useConfig from './useConfig';
import useJwt from './useJwt';
import axios from 'axios';
import { AxiosError } from 'axios';
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from 'react-query';

type UseGetParams<ResponseType> = {
  endpoint: string;
  key: QueryKey;
  options?: Omit<
    UseQueryOptions<ResponseType, AxiosError>,
    'queryKey' | 'queryFn'
  >;
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
  return useQuery<ResponseType, AxiosError>(key, () => getUtil(), options);
}

type UsePostParams<BodyType, ResponseType> = {
  endpoint: string;
  options?: UseMutationOptions<ResponseType, AxiosError, BodyType>;
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

type UseDeleteParams<ResponseType> = {
  endpoint: string;
  options?: UseMutationOptions<ResponseType, AxiosError>;
  baseUrl?: string;
};

export function useDelete<ResponseType>({
  endpoint,
  options = {},
  baseUrl: alternateBaseUrl,
}: UseDeleteParams<ResponseType>) {
  const client = axios;
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
  const deleteUtil = async () => {
    const response = await client.delete<ResponseType>(
      `${alternateBaseUrl ?? baseUrl}${endpoint}`,
      {
        headers: { 'x-tup-token': jwt ?? '' },
      }
    );
    return response.data;
  };
  const mutation = useMutation(async () => {
    const response = await deleteUtil();
    return response;
  }, options);
  return mutation;
}
