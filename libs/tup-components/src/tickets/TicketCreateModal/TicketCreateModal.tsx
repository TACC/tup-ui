import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import { TicketCreateForm } from './TicketCreateForm';
import styles from './TicketCreateModal.module.css';

const TicketCreateModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <>
      <Button type="secondary" onClick={() => toggle()}>
        + New Ticket
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader
          toggle={toggle}
          close={closeBtn}
          className={styles['modal-header']}
        >
          <span>New Ticket</span>
        </ModalHeader>
        <ModalBody>
          <TicketCreateForm />
        </ModalBody>
      </Modal>
    </>
  );
};

export default TicketCreateModal;
