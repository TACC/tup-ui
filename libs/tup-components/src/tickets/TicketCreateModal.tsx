import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { TicketCreateForm } from './TicketCreateForm';
//import './TicketCreateModal.scss';

const TicketCreateModal: React.FC = () => {
  const navigate = useNavigate();
  const modalAlwaysOpen = true;
  const close = () => {
    navigate('/');
  };

  return (
    <Modal
      modalClassName="ticket-create-modal"
      isOpen={modalAlwaysOpen}
      toggle={close}
      size="lg"
      contentClassName="ticket-create-modal-content"
    >
      <ModalHeader toggle={close} charCode="&#xe912;">
        Add Ticket
      </ModalHeader>
      <ModalBody>
        <TicketCreateForm />
      </ModalBody>
    </Modal>
  );
};

export default TicketCreateModal;
