import React from 'react';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectsAllocations, useProjects } from '@tacc/tup-hooks';
import { Link } from 'react-router-dom';
import { EmptyTablePlaceholder } from '../utils';

const PROJECTS_DASHBOARD_DISPLAY_LIMIT = 7;

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
  ).slice(0, PROJECTS_DASHBOARD_DISPLAY_LIMIT);

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
      <table>
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Principal Investigator</th>
            <th>Active Allocations</th>
          </tr>
        </thead>
        <tbody>
          {!projectData?.length && (
            <tr>
              <td colSpan={3}>
                <EmptyTablePlaceholder>
                  No projects or allocations found. {''}
                  <a
                    href="https://submit-tacc.xras.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Create a new project on TXRAS.
                  </a>
                </EmptyTablePlaceholder>
              </td>
            </tr>
          )}
          {projectData?.map((project) => (
            <tr key={project.id}>
              <td style={{ width: '30%' }}>
                <Link to={`/projects/${project.id}`}>
                  {project.title ?? 'Untitled Project'} ({project.chargeCode})
                </Link>
              </td>
              <td
                style={{ width: '20%' }}
              >{`${project.pi.firstName} ${project.pi.lastName}`}</td>
              <td>{allocationDisplay(project.allocations ?? [])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsTable;
