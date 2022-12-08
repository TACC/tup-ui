import { Section } from '@tacc/core-components';
import { PageLayout } from '@tacc/tup-components';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectMember: React.FC = () => {
  const { username } = useParams<{
    projectId: string;
    username: string;
  }>();
  return (
    <Section
      header={`Project member: ${username}`}
      content={<PageLayout />}
    ></Section>
  );
};

export default ProjectMember;
