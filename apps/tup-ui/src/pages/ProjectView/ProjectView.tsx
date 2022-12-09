import { Section } from '@tacc/core-components';
import { PageLayout } from '@tacc/tup-components';
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ProjectView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return (
    <Section
      header={`Project View: ${projectId}`}
      content={
        <PageLayout
          top={<div>header placeholder</div>}
          left={<div>user list placeholder</div>}
          right={<Outlet />}
        />
      }
    ></Section>
  );
};

export default ProjectView;
