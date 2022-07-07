import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

//Retrieve a JWT stored in the x-tup-token cookie.
const getJwt = () => {
  const cookie = Cookies.get('x-tup-token');
  return cookie; 
};

const useJwt = () => {
  const query = useQuery('jwt', getJwt, { retry: false });
  const { data: jwt, isLoading, error, status } = query;
  return {
    jwt,
    isLoading,
    error,
    status
  };
};

export default useJwt;