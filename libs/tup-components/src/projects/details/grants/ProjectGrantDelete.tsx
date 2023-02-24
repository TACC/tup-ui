import { Button } from '@tacc/core-components';
import { useGrantDelete } from '@tacc/tup-hooks';
import React, { useState } from 'react';

const ProjectGrantDelete: React.FC<{
  projectId: number;
  grantId: number;
}> = ({ projectId, grantId }) => {
  const [confirmState, setConfirmState] = useState<'CONFIRM' | 'DEFAULT'>(
    'DEFAULT'
  );

  const { mutate } = useGrantDelete(projectId, grantId);

  const deleteGrant = () =>
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
          <Button type="link" onClick={deleteGrant}>
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

export default ProjectGrantDelete;
