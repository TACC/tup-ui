import { useGet } from './requests';
import { UserNewsResponse } from '.';

export const useUserNews = () => {
  return useGet<UserNewsResponse[]>({ endpoint: '/news', key: 'news' });
};
