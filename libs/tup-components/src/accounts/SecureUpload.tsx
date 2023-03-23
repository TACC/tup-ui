import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import styles from './SecureUpload.module.css';

const SecureUpload: React.FC = () => {
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
      <Button
        className={styles['secure-upload-button']}
        type="primary"
        onClick={() => toggle()}
      >
        Secure Upload
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="md"
        className="modal-dialog-centered"
      >
        <ModalHeader
          toggle={toggle}
          close={closeBtn}
          className={styles['modal-header']}
        >
          <span>Secure File Upload</span>
        </ModalHeader>
        <ModalBody>
          <iframe
            title="Secure Upload"
            id="box-upload-widget-iframe-g9aymjl7wd8"
            src="https://utexas.app.box.com/upload-widget/view/ei1fjhti7tlysjflmr8utiwf59phxxbe/65197433553?height=420&instructions=Please+use+this+area+to+upload+all+documents+securely.+&title=TACC+Secure+Upload&isDescriptionFieldShown=1&isEmailRequired=1"
            width="100%"
            allowTransparency
            style={{ border: 'none' }}
            height="433"
          ></iframe>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SecureUpload;
