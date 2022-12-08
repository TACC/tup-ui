import React from 'react';
import { PageLayout } from '../layout';
import { Section, SectionTableWrapper } from '@tacc/core-components';
import { ProjectsTable } from './ProjectsTable';
import ProjectSummaryListing from './ProjectsSummaryListing';

const ProjectsLayout: React.FC = () => {
  return <Section header="Projects & Allocations" content={<SectionTableWrapper><ProjectSummaryListing /> </SectionTableWrapper>} />;
};
export default ProjectsLayout;
