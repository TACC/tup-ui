import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

//Retrieve a JWT stored in the x-tup-token cookie.
const getJwt = () => {
  const cookie = Cookies.get('x-tup-token');
  if (!cookie) {
    throw new Error('No JWT found.');
  }
  return cookie;
};

const useJwt = () => {
  const query = useQuery('jwt', getJwt, { retry: false });
  return query;
};

export default useJwt;