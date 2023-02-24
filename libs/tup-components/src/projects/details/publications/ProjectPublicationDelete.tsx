import { Button } from '@tacc/core-components';
import { usePublicationDelete } from '@tacc/tup-hooks';
import React, { useState } from 'react';

const ProjectPublicationDelete: React.FC<{
  projectId: number;
  publicationId: number;
}> = ({ projectId, publicationId }) => {
  const [confirmState, setConfirmState] = useState<'CONFIRM' | 'DEFAULT'>(
    'DEFAULT'
  );

  const { mutate } = usePublicationDelete(projectId, publicationId);

  const deletePublication = () =>
    mutate(undefined, {
      onSuccess: () => {
        setConfirmState('DEFAULT');
      },
    });

  switch (confirmState) {
    case 'DEFAULT':
      return (
        <Button onClick={() => setConfirmState('CONFIRM')} type="link">
          Delete
        </Button>
      );
    case 'CONFIRM':
      return (
        <>
          <Button type="link" onClick={deletePublication}>
            <strong>Confirm Deletion</strong>
          </Button>
          {' | '}
          <Button onClick={() => setConfirmState('DEFAULT')} type="link">
            <strong>Cancel</strong>
          </Button>
        </>
      );
  }
};

export default ProjectPublicationDelete;
