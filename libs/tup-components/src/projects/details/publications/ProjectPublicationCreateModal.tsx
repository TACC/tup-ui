import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@tacc/core-components';
import { ProjectPublicationCreateForm } from './ProjectPublicationCreateForm';

const ProjectPublicationCreateModal: React.FC<{
  projectId: number;
}> = ({ projectId }) => {
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
        <strong> + Add Publication</strong>
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} size="md">
        <ModalHeader toggle={toggle} close={closeBtn}>
          <span>Add Publication</span>
        </ModalHeader>
        <ModalBody>
          <ProjectPublicationCreateForm projectId={projectId} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ProjectPublicationCreateModal;
