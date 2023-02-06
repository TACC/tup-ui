import { ProjectDetails } from '@tacc/tup-components';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) return <div>No project selected.</div>;
  return <ProjectDetails projectId={parseInt(projectId)} />;
};

export default ProjectDetail;
