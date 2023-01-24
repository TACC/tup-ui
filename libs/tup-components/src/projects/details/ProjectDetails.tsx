import React from 'react';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { useProjects, usePublications, useGrants } from '@tacc/tup-hooks';
import styles from './ProjectDetails.module.css';
import { Link } from 'react-router-dom';


const ProjectDetails: React.FC<{ projectId: number }> = ({ projectId }) => {
  const { isLoading, error } = useProjects();
  const details = useProjects();
  const project_data = details.data ?? [];
  const projectDetails = project_data.find((desc) => desc.id === projectId);

  const publications = usePublications(projectId);
  const pub_data = publications.data ?? [];
  const pub_details = pub_data.find((pub) => pub.id === projectId);

  const grants = useGrants(projectId);
  const grant_data = grants.data ?? [];
  const grant_details = grant_data.find(
    (grant: { id: number }) => grant.id === projectId
  );

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <InlineMessage type="warning">Unable to retrieve project details.</InlineMessage>
    );

  return (
    <>
      <div >
        <span className={styles['project-detail-header']}>Abstract
        <Link to={`/projects/${projectId}`} className={styles['link']}>
          Edit Abstract
        </Link></span>
        <span className={styles['project-details']}>
          {projectDetails?.description}
        </span>
      </div>
      <div className={styles['separator']}></div>
      <div>
        <span className={styles['project-detail-header']}>Publications
        <Link to={`/projects/${projectId}/publications`} className={styles['link']}>
          + Add Publication
        </Link></span>
        {pub_details === undefined ? (
          <span className={styles['project-details']}>
            This project has no publications.
          </span>
        ) : (
          <span className={styles['project-details']}>
            <span className={styles['project-details-bold']}>
              {pub_details?.title}
            </span>
            <span>{pub_details?.authors}</span>
            <span>
              <span>{pub_details.publisher}</span>{' '}
              <span>{pub_details.venue}</span>{' '}
              <span>{pub_details.yearPublished}</span>
            </span>
            <span>{pub_details?.url}</span>
          </span>
        )}
      </div>
      <div className={styles['separator']}></div>
      <div>
        <span className={styles['project-detail-header']}>Grants
        <Link to={`/projects/${projectId}/grants`} className={styles['link']}>
          + Add Grant
        </Link></span>
        {grant_details === undefined ? (
          <span className={styles['project-details']}>
            This project has no grants.
          </span>
        ) : (
          <span>
            <span className={styles['project-details-bold']}>
              {grant_details?.title}
            </span>
            <span>Principle Investigator:</span> {grant_details?.title}
            <span>{grant_details?.field}</span>
            <span>Funding Agency:</span> {grant_details?.fundingAgency}
            <span>Award Number:</span> {grant_details?.awardNumber}
          </span>
        )}
      </div>
    </>
  );
};

export default ProjectDetails;
