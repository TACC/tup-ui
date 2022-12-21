import React from 'react';
import { Section } from '@tacc/core-components';
import { AllocationsTable } from '../allocations';

const ProjectsLayout: React.FC = () => {
  return (
    <Section header="Projects & Allocations">
      <div>
        <AllocationsTable />
      </div>
    </Section>
  );
};
export default ProjectsLayout;