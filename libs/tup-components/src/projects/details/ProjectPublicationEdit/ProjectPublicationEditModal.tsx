import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import { ProjectPublicationEditForm } from './ProjectPublicationEditForm'
import { createResponseComposition } from 'msw';

const ProjectPublicationEditModal: React.FC<{ 
    projectId: number, 
    publicationId: number }> 
    = ({ projectId, publicationId }) => { 
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
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader
        toggle={toggle}
        close={closeBtn}>
          <span>Edit Publication</span>
        </ModalHeader>
        <ModalBody>
          <ProjectPublicationEditForm projectId={projectId} publicationId={publicationId}/>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProjectPublicationEditModal;
