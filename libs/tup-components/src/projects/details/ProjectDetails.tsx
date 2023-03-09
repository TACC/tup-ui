import React from 'react';
import {
  LoadingSpinner,
  InlineMessage,
  SectionTableWrapper,
  Button,
} from '@tacc/core-components';
import {
  useProjects,
  usePublications,
  useGrants,
  ProjectPublication,
  ProjectGrant,
  useRoleForCurrentUser,
} from '@tacc/tup-hooks';
import styles from './ProjectDetails.module.css';
import { Link } from 'react-router-dom';
import {
  ProjectPublicationEditModal,
  ProjectPublicationCreateModal,
} from './publications';
import { ProjectGrantEditModal, ProjectGrantCreateModal } from './grants';
import { ProjectsListingAllocationTable } from '../ProjectsListing/ProjectsListingAllocationTable';
import { ProjectEditModal } from './ProjectEdit';
import ProjectPublicationRemove from './publications/ProjectPublicationDelete';
import ProjectGrantDelete from './grants/ProjectGrantDelete';

const formatDate = (datestring: string): string => {
  const date = new Date(datestring);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const Publication: React.FC<{
  projectId: number;
  pub: ProjectPublication;
  canManage: boolean;
}> = ({ pub, projectId, canManage }) => {
  return (
    <div>
      <div className={styles['pub-grants-edit-link']}>
        <span style={{ fontSize: '1.5rem' }}>
          <strong>{pub.title}</strong>
        </span>
        {canManage && (
          <span>
            <ProjectPublicationEditModal
              projectId={projectId}
              publicationId={pub.id}
            />
            {' | '}
            <ProjectPublicationRemove
              projectId={projectId}
              publicationId={pub.id}
            />
          </span>
        )}
      </div>
      <div className={styles['pub-grants-title']}>
        Author(s):{' '}
        <span className={styles['pub-grants-info']}>{pub.authors}</span>
      </div>
      <div className={styles['pub-grants-title']}>
        Publisher:{' '}
        <span className={styles['pub-grants-info']}>
          {pub.publisher ?? '(N/A)'}
        </span>
        Published:{' '}
        <span className={styles['pub-grants-info']}>{pub.yearPublished}</span>
        Venue:{' '}
        <span className={styles['pub-grants-info']}>
          {pub.venue || '(N/A)'}
        </span>
      </div>
      {pub.url && <Link to={pub.url}>{pub.url}</Link>}
    </div>
  );
};

const NewAllocation = () => (
  <a href="https://submit-tacc.xras.org/" target="_blank" rel="noreferrer">
    <Button type="link">+ Add New Allocation</Button>
  </a>
);

const IncreaseAllocation = () => (
  <a
    href="https://submit-tacc.xras.org/requests"
    target="_blank"
    rel="noreferrer"
  >
    <Button type="link">Increase Existing Allocation</Button>
  </a>
);

const AbstractGrants = () => (
  <a
    href="https://submit-tacc.xras.org/requests"
    target="_blank"
    rel="noreferrer"
  >
    <Button type="link">Edit Project</Button>
  </a>
);

const ProjectDetails: React.FC<{ projectId: number }> = ({ projectId }) => {
  const { data: projectData, isLoading, error } = useProjects();
  const projectDetails = (projectData ?? []).find(
    (desc) => desc.id === projectId
  );
  const pub_data = usePublications(projectId).data ?? [];
  const grant_data = useGrants(projectId).data ?? [];
  const currentUserRole = useRoleForCurrentUser(projectId);
  const canManage = currentUserRole
    ? ['PI', 'Delegate'].includes(currentUserRole)
    : false;

  if (isLoading)
    return (
      <div className={styles['pub-details-container']}>
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <InlineMessage type="warning">
        Unable to retrieve project details.
      </InlineMessage>
    );

  return (
    <div className={styles['pub-details-container']}>
      <SectionTableWrapper
        header="Allocations"
        headerActions={
          canManage && (
            <span>
              <NewAllocation />
              {' | '}
              <IncreaseAllocation />
            </span>
          )
        }
      >
        {projectDetails && (
          <ProjectsListingAllocationTable project={projectDetails} />
        )}
      </SectionTableWrapper>
      <div className={styles['separator']}></div>

      <SectionTableWrapper
        header="Publications"
        className={styles['listing-section']}
        headerActions={
          canManage && <ProjectPublicationCreateModal projectId={projectId} />
        }
      >
        {pub_data.length === 0 ? (
          <span>This project has no publications.</span>
        ) : (
          pub_data.map((pub) => (
            <Publication
              key={pub.id}
              pub={pub}
              projectId={projectId}
              canManage={canManage}
            />
          ))
        )}
      </SectionTableWrapper>
      <div className={styles['separator']}></div>

      <SectionTableWrapper
        header="Abstract/Grants"
        headerActions={canManage && <AbstractGrants />}
      >
        <div className={styles['pub-grants-title']}>
          Your project and allocation information can be managed on the TXRAS
          portal.
        </div>
      </SectionTableWrapper>
    </div>
  );
};

export default ProjectDetails;
