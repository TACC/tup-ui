import React from 'react';
import { PageLayout } from '../layout';
import { Section } from '@tacc/core-components';
import { AllocationsTable } from '../allocations';


// const ProjectsLayout: React.FC = () => {
//   return <Section header="Projects & Allocations" content={<PageLayout />} />;
// };
// export default ProjectsLayout;

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