import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Formik } from 'formik';
import { FieldWrapperFormik as FieldWrapper } from '@tacc/core-wrappers';
import { Button, TextCopyField } from '@tacc/core-components';

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
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalHeader
          toggle={toggle}
          close={closeBtn}
        >
          {title}
        </ModalHeader>
        <ModalBody>
          <Formik>
            <FieldWrapper
              name='text'
              label='Code'
              description={hint}
              className="s-affixed-input-wrapper s-affixed-input-wrapper__prepend"
            >
              <TextCopyField
                value={text}
                // ButtonWrapper={ButtonWrapper}
              />
            </FieldWrapper>
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TextCopyModal;
