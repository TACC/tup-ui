import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

//Retrieve a JWT stored in the x-tup-token cookie.
const getJwt = () => {
  const cookie = Cookies.get('x-tup-token');
  if (!cookie) return '';
  return cookie;
};

const useJwt = () => {
  const query = useQuery(['jwt'], getJwt, { retry: false });
  const { data: jwt, ...extra } = query;
  return {
    jwt: jwt || undefined,
    ...extra,
  };
};

export default useJwt;
