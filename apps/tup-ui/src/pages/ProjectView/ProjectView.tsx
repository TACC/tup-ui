import { Section } from '@tacc/core-components';
import { PageLayout } from '@tacc/tup-components';
import React from 'react';
import { Outlet } from 'react-router-dom';

const ProjectView: React.FC = () => {
  return (
    <Section
      header="Project View"
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
