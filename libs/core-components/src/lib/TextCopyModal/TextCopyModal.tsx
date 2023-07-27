import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button, TextCopyField } from '../../';

import styles from './TextCopyModal.module.css';

const TextCopyModal: React.FC<
  React.PropsWithChildren<{
    display: 'secondary' | 'link';
    title: string;
    text: string;
    hint?: React.ReactNode;
  }>
> = ({ children, display, title, text, hint }) => {
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
      <Button type={display} onClick={() => toggle()}>
        {children}
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="md"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody className={styles['modal-body']}>
          <div className="s-affixed-input-wrapper s-affixed-input-wrapper--prepend s-affixed-input-wrapper--full-width s-form">
            <label htmlFor="text">Code</label>
            <TextCopyField
              id="text"
              value={text}
              buttonClassName="s-affixed-input-wrapper__prepend"
            />
            <small>{hint}</small>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TextCopyModal;
