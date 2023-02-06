import { useGet } from '../requests';
import { UserNewsResponse } from '.';

const useUserNews = () => {
  return useGet<UserNewsResponse[]>({ endpoint: '/news', key: ['news'] });
};

export default useUserNews;
