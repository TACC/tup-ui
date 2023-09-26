import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import { TicketCreateForm } from './TicketCreateForm';
import styles from './TicketCreateModal.module.css';

const TicketCreateModal: React.FC<
  React.PropsWithChildren<{
    display: 'secondary' | 'link';
    size?: 'small';
  }>
> = ({ children, size, display }) => {
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
      {display === 'secondary' && (
        <Button onClick={() => toggle()} type="secondary" size={size}>
          {children}
        </Button>
      )}
      {display === 'link' && (
        <Button onClick={() => toggle()} type="link">
          {children}
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="lg"
        className="modal-dialog-centered"
      >
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
