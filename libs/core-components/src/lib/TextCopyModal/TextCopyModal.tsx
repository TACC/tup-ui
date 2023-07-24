import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FieldWrapper } from '@tacc/core-wrappers';
import { Button, TextCopyField } from '@tacc/core-components';

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

  const ButtonWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="input-group-prepend">{children}</div>;
  };

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
          <form>
            <FieldWrapper
              name="text"
              label="Code"
              description={hint}
              className="s-affixed-input-wrapper s-affixed-input-wrapper--prepend s-affixed-input-wrapper--full-width"
            >
              <TextCopyField
                value={text}
                buttonClassName="s-affixed-input-wrapper__prepend"
              />
            </FieldWrapper>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TextCopyModal;
