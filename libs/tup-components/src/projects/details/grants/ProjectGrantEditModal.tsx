import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import { ProjectGrantEditForm } from './ProjectGrantEditForm';

const ProjectGrantEditModal: React.FC<{
  projectId: number;
  grantId: number;
}> = ({ projectId, grantId }) => {
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
      <Button type="link" onClick={() => toggle()}>
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggle} close={closeBtn}>
          <span>Edit Grant</span>
        </ModalHeader>
        <ModalBody>
          <ProjectGrantEditForm projectId={projectId} grantId={grantId} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProjectGrantEditModal;
