import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const TicketCreateModal: React.FC = () => {
  const params = useParams();
  const modalAlwaysOpen = true;
  return (
    <Modal className="ticket-model-content" isOpen={modalAlwaysOpen} size="lg">
      <ModalBody>My Ticket ID: {params.ticketId}</ModalBody>
    </Modal>
  );
};

export default TicketCreateModal;
