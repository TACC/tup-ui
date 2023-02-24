import { Button } from '@tacc/core-components';
import { usePublicationDelete } from '@tacc/tup-hooks';
import React, { useState } from 'react';

const ProjectPublicationDelete: React.FC<{
  projectId: number;
  publicationId: number;
  isOpen: boolean;
}> = ({ projectId, publicationId, isOpen }) => {
  const [confirmState, setConfirmState] = useState<true | false>(
    isOpen
  );

  const { mutate } = usePublicationDelete(projectId, publicationId);

  const deletePublication = () =>
    mutate(undefined, {
      onSuccess: () => {
        setConfirmState(false);
      },
    });

  switch (confirmState) {
    case false:
      return (
        <Button onClick={() => setConfirmState(true)} type="link">
          Delete
        </Button>
      );
    case true:
      return (
        <>
          <Button type="link" onClick={deletePublication}>
            <strong>Confirm Deletion</strong>
          </Button>
          {' | '}
          <Button onClick={() => setConfirmState(false)} type="link">
            <strong>Cancel</strong>
          </Button>
        </>
      );
  }
};

export default ProjectPublicationDelete;
