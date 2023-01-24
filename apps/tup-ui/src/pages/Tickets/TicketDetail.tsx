import { TicketModal } from '@tacc/tup-components';

import { useParams } from 'react-router-dom';

const TicketDetail = () => {
  const ticketId = useParams().ticketId ?? '';
  return <TicketModal ticketId={ticketId} />;
};

export default TicketDetail;
