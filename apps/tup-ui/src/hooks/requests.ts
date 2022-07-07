import useAxios from "./useAxios";
import useConfig from "./useConfig";
import useJwt from "./useJwt";
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';

export function useGet<ResponseType>(endpoint: string, key: string,
  options: Omit<UseQueryOptions<ResponseType, Error>, "queryKey" | "queryFn"> = {}
  ) {
  const client = useAxios();
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
  const getUtil = async () => {
    const request = await client.get<ResponseType>(`${baseUrl}${endpoint}`, {
      headers: { 'x-tup-token': jwt ?? '' },
    });
    return request.data;
  }
  return useQuery(key, () => getUtil(), options);
}


export function usePost<BodyType, ResponseType>(endpoint: string,
  options: UseMutationOptions<ResponseType, Error, BodyType> = {}
) {
  const client = useAxios();
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
  const postUtil = async (body: BodyType) => {
    const response = await client.post<ResponseType>(`${baseUrl}${endpoint}`, body, {
      headers: { 'x-tup-token': jwt ?? ''}
    });
    return response.data;
  }
  const mutation = useMutation(
    async (body: BodyType) => {
      const response = await postUtil(body);
      return response;
    },
    options
  );
  return mutation;
}