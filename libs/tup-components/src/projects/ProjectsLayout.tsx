import React from 'react';
import { PageLayout } from '../layout';
import { Section } from '@tacc/core-components';
import { ProjectsTable } from './ProjectsTable';

const ProjectsLayout: React.FC = () => {
  return <Section header="Projects & Allocations" content={<PageLayout />} />;
};
export default ProjectsLayout;
