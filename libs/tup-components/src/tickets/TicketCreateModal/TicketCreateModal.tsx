import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
  Button,
  ButtonTypeLinkSize,
  ButtonTypePrimarySize,
  ButtonTypeOtherSize,
} from '@tacc/core-components';
import { TicketCreateForm } from './TicketCreateForm';
import styles from './TicketCreateModal.module.css';

type ButtonProps = {
  [Property in keyof ButtonTypeLinkSize as Property extends 'type'
    ? 'display'
    : Property]: ButtonTypeLinkSize[Property];
} | {
  [Property in keyof ButtonTypePrimarySize as Property extends 'type'
    ? 'display'
    : Property]: ButtonTypePrimarySize[Property];
} | {
  [Property in keyof ButtonTypeOtherSize as Property extends 'type'
    ? 'display'
    : Property]: ButtonTypeOtherSize[Property];
};

const TicketCreateModal: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  display,
  size,
}) => {
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
      <Button type={display} size={size} onClick={() => toggle()}>
        {children}
      </Button>
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
