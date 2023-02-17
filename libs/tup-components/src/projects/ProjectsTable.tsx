import React from 'react';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectsAllocations, useProjects } from '@tacc/tup-hooks';
import { Link } from 'react-router-dom';

const allocationDisplay = (allocations: ProjectsAllocations[]) => {
  return allocations.length
    ? Array.from(
        new Set(
          allocations
            .filter((e) => e.status === 'Active')
            .map((e) => e.resource)
        )
      ).join(', ')
    : '--';
};

export const ProjectsTable: React.FC = () => {
  const { data, isLoading, error } = useProjects();
  const projectData = data?.filter((prj) =>
    prj.allocations?.some((alloc) => alloc.status === 'Active')
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <InlineMessage type="warn">Unable to retrieve projects.</InlineMessage>
    );
  }
  return (
    <div className="o-fixed-header-table">
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Principal Investigator</th>
            <th>Active Allocations</th>
          </tr>
        </thead>
        <tbody>
          {projectData && projectData.length ? (
            projectData.map((project) => (
              <tr key={project.id}>
                <td style={{ width: '30%' }}>
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </td>
                <td
                  style={{ width: '20%' }}
                >{`${project.pi.firstName} ${project.pi.lastName}`}</td>
                <td>{allocationDisplay(project.allocations ?? [])}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No active projects found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsTable;
