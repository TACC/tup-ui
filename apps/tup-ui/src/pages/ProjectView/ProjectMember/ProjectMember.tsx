import { UserDetail } from '@tacc/tup-components';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectMember: React.FC = () => {
  const { username, projectId } = useParams<{
    projectId: string;
    username: string;
  }>();
  return (
    <UserDetail
      projectId={parseInt(projectId ?? '')}
      username={username ?? ''}
    />
  );
};

export default ProjectMember;
