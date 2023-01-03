import React from 'react';
import { Section } from '@tacc/core-components';
import { ProjectsSummaryListing } from './ProjectsSummaryListing';
import { AllocationsTable } from '../allocations';

const ProjectsLayout: React.FC = () => {
  return (
    <Section
      header="Projects & Allocations"
      content={
        <tbody>
          <ProjectsSummaryListing />
        </tbody>
      }
    />
  );
};
export default ProjectsLayout;
