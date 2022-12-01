import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { TicketCreateForm } from './TicketCreateForm';
import { useProfile } from '@tacc/tup-hooks';
import './TicketCreateModal.scss';

const TicketCreateModal: React.FC = () => {
  const navigate = useNavigate();
  const modalAlwaysOpen = true;
  const profile = useProfile().data;

  const close = () => {
    navigate(-1);
  };

  const closeBtn = (
    <button className="close" onClick={close} type="button">
      &times;
    </button>
  );

  return (
    <Modal
      modalClassName="ticket-create-modal"
      isOpen={modalAlwaysOpen}
      toggle={close}
      size="lg"
      contentClassName="ticket-create-modal-content"
    >
      <ModalHeader toggle={close} close={closeBtn}>
        New Ticket
      </ModalHeader>
      <TicketCreateForm profile={profile} />
    </Modal>
  );
};

export default TicketCreateModal;
