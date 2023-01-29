import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import { ProjectGrantCreateForm } from './ProjectGrantCreateForm'
import { createResponseComposition } from 'msw';

const ProjectGrantCreateModal: React.FC<{ 
    projectId: number,  }> 
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
        + Add Grant
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader
        toggle={toggle}
        close={closeBtn}>
          <span>Add Grant</span>
        </ModalHeader>
        <ModalBody>
          <ProjectGrantCreateForm projectId={projectId}/>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProjectGrantCreateModal;
