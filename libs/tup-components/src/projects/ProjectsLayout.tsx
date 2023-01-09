import React from 'react';
import { Section } from '@tacc/core-components';
import { ProjectsSummaryListing } from './ProjectsSummaryListing';
import { AllocationsTable } from '../allocations/AllocationTable';
import {  useProjectUsers } from '@tacc/tup-hooks';

const ProjectsLayout: React.FC<{ projectId: number; username: string }> = ({
  projectId,
  username,
}) => {
  const projectUsers = useProjectUsers(projectId);
  const data = projectUsers.data ?? [];
  const user = data.find((user) => user.username === username);
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
            <AllocationsTable username={username} projectId={projectId} />
          </div>
        </>
      }
    />
  );
};
export default ProjectsLayout;
