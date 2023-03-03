import React from 'react';
import { TicketModal } from '@tacc/tup-components';

import { useParams } from 'react-router-dom';

const TicketDetail: React.FC<{ baseRoute: string }> = ({ baseRoute }) => {
  const ticketId = useParams().ticketId ?? '';
  return <TicketModal ticketId={ticketId} baseRoute={baseRoute} />;
};

export default TicketDetail;
