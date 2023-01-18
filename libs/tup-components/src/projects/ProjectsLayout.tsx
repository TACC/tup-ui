import React from 'react';
import { Section } from '@tacc/core-components';
import { ProjectsSummaryListing } from './ProjectsSummaryListing';

const ProjectsLayout: React.FC = () => {
  return (
    <Section
      header="Projects & Allocations"
      content={<ProjectsSummaryListing />}
    />
  );
};
export default ProjectsLayout;
