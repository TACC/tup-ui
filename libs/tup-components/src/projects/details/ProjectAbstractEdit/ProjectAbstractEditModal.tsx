import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import { ProjectAbstractEditForm } from './ProjectAbstractEditForm'
import { createResponseComposition } from 'msw';

const ProjectAbstractEditModal: React.FC<{ 
    projectId: number }> 
    = ({ projectId }) => { 
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
        Edit Abstract
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader
        toggle={toggle}
        close={closeBtn}>
          <span>Edit Abstract</span>
        </ModalHeader>
        <ModalBody>
          <ProjectAbstractEditForm projectId={projectId} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProjectAbstractEditModal;
