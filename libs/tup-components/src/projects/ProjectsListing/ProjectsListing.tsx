import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectSummary } from './ProjectSummary';
import { ProjectsListingAllocationTable } from './ProjectsListingAllocationTable';
import { ProjectsRawSystem, useProjects } from '@tacc/tup-hooks';
import { EmptyTablePlaceholder } from '../../utils';
import { useLocation } from 'react-router-dom';
import styles from './ProjectsListing.module.css';

const isActive = (project: ProjectsRawSystem): boolean => {
  return (project.allocations ?? []).some((alloc) => alloc.status === 'Active');
};

export const ProjectsListing: React.FC = () => {
  const { data, isLoading, error } = useProjects();
  const location = useLocation();
  const show = new URLSearchParams(location.search).get('show');

  const prjFilter =
    !show || show === 'active'
      ? (prj: ProjectsRawSystem) => isActive(prj)
      : (prj: ProjectsRawSystem) => !isActive(prj);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <InlineMessage type="warning">Unable to retrieve projects.</InlineMessage>
    );
  if (!data?.length) {
    return (
      <EmptyTablePlaceholder>
        No projects or allocations found. {''}
        <a
          href="/use-tacc/allocations/#request"
          target="_blank"
          rel="noreferrer"
        >
          Learn how to request a new allocation.
        </a>
      </EmptyTablePlaceholder>
    );
  }

  return (
    <ul className={styles['project-listing']}>
      {data?.filter(prjFilter).map((project) => (
        <li key={project.id} className={styles['project-listing-row']}>
          <div>
            <ProjectSummary project={project} />
          </div>
          <div>
            <ProjectsListingAllocationTable project={project} />
          </div>
        </li>
      ))}
    </ul>
  );
};
