import { SectionTableWrapper } from '@tacc/core-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectsTable } from './ProjectsTable';

const ProjectsDashboard: React.FC = () => {
  return (
    <SectionTableWrapper
      header="Active Projects"
      headerActions={
        <Link to={'/projects'} className="btn btn-secondary btn-sm">
          View all Projects & Allocations
        </Link>
      }
      contentShouldScroll
    >
      <ProjectsTable />
    </SectionTableWrapper>
  );
};

export default ProjectsDashboard;
