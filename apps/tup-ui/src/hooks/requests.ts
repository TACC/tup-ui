import useAxios from "./useAxios";
import useConfig from "./useConfig";
import useJwt from "./useJwt";
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from 'react-query';

export function useGet<ResponseType>(endpoint: string, key: string) {
  const client = useAxios();
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();

  const getUtil = async () => {
    const request = await client.get<ResponseType>(`${baseUrl}${endpoint}`, {
      headers: { 'x-tup-token': jwt ?? '' },
    });
    return request.data;
  }
  return useQuery(key, () => getUtil());
}

export function usePost<BodyType, ResponseType>(endpoint: string, callback?: (data: AxiosResponse<ResponseType, any>) => void) {
  const client = useAxios();
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
  const postUtil = async (body: BodyType) => {
    const response = await client.post<ResponseType>(`${baseUrl}${endpoint}`, body, {
      headers: { 'x-tup-token': jwt ?? ''}
    });
    return response;
  }
  const mutation = useMutation(
    async (body: BodyType) => {
      const response = await postUtil(body);
      callback && callback(response);
    }
  );
  return mutation;
}