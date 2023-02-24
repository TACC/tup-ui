import { Button } from '@tacc/core-components';
import { useGrantDelete } from '@tacc/tup-hooks';
import React, { useState } from 'react';

const ProjectGrantDelete: React.FC<{
  projectId: number;
  grantId: number;
  isOpen: boolean;
}> = ({ projectId, grantId, isOpen }) => {
  const [confirmState, setConfirmState] = useState<true | false>(
    isOpen
  );

  const { mutate } = useGrantDelete(projectId, grantId);

  const deleteGrant = () =>
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
          <Button type="link" onClick={deleteGrant}>
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

export default ProjectGrantDelete;
