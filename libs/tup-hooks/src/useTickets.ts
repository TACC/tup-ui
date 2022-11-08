import { UseQueryResult } from 'react-query';
import { useGet } from './requests';
import { Ticket } from '.';

// Query to retrieve the user's tickets.
const useTickets = (): UseQueryResult<Ticket[]> => {
  const query = useGet<Ticket[]>({
    endpoint: '/tickets',
    key: 'tickets',
  });
  const tickets = query.data;
  return query;
};

export default useTickets;
