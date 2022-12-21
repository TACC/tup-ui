import React from 'react';
import { Section } from '@tacc/core-components';
import { ProjectsSummaryListing } from '../projects';
import { AllocationsTable } from '../allocations';

const ProjectsLayout: React.FC = () => {
  return (
    <Section header="Projects & Allocations">
      <div>
        <ProjectsSummaryListing />
        <AllocationsTable />
      </div>
    </Section>
  );
};
export default ProjectsLayout;
