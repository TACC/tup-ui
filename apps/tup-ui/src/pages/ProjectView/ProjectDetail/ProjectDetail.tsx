import { Section } from '@tacc/core-components';
import { PageLayout } from '@tacc/tup-components';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return (
    <Section
      header={`Project Detail: ${projectId}`}
      content={<PageLayout />}
    ></Section>
  );
};

export default ProjectDetail;
