import React from 'react';
import { Section } from '@tacc/core-components';
import { ProjectsSummaryListing } from './ProjectsSummaryListing';
import { AllocationsTable } from '../allocations/AllocationTable';

const ProjectsLayout: React.FC = () => {
  return (
    <Section
      header="Projects & Allocations"
      content={
        <>
          <nav>
            TODO: Replace this <code>&lt;nav&gt;</code> with a{' '}
            <code>&lt;Sidebar&gt;</code>.
          </nav>
          {/* TODO: Once Allocations are loaded within Projects (i.e. `<AllocationsTable />` is not loaded here), remove this temporary <div> wrapper */}
          <div>
            <ProjectsSummaryListing />
            <AllocationsTable />
          </div>
        </>
      }
    />
  );
};
export default ProjectsLayout;
