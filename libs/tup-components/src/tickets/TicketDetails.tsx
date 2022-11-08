import React from 'react';
import { useParams } from 'react-router-dom';

const TicketDetails: React.FC = () => {
  const params = useParams();
  return <div>Ticket ID {params.ticketId}</div>;
};

export default TicketDetails;
