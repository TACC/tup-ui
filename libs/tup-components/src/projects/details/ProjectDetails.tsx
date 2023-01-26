import React from 'react';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { useProjects, usePublications, useGrants } from '@tacc/tup-hooks';
import styles from './ProjectDetails.module.css';
import { Link } from 'react-router-dom';

const formatDate = (datestring: string): string => {
  const date = new Date(datestring);
  return `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`;
};

const ProjectDetails: React.FC<{ projectId: number }> = ({ projectId }) => {
  const { isLoading, error } = useProjects();
  const details = useProjects();
  const project_data = details.data ?? [];
  const projectDetails = project_data.find((desc) => desc.id === projectId);

  const publications = usePublications(projectId);
  const pub_data = publications.data ?? [];
  const pub_details = pub_data.map((details) => details);

  const grants = useGrants(projectId);
  const grant_data = grants.data ?? [];
  const grant_details = grant_data.map((details) => details);

  console.log(pub_details);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <InlineMessage type="warning">
        Unable to retrieve project details.
      </InlineMessage>
    );

  return (
    <>
      <div>
        <span className={styles['project-detail-header']}>
          Abstract
          <Link to={`/projects/${projectId}`} className={styles['link']}>
            Edit Abstract
          </Link>
        </span>
        <span className={styles['project-details']}>
          {projectDetails?.description}
        </span>
      </div>
      <div className={styles['separator']}></div>
      <div>
        <span className={styles['project-detail-header']}>
          Publications
          <Link
            to={`/projects/${projectId}/publications`}
            className={styles['link']}
          >
            + Add Publication
          </Link>
        </span>
        {pub_data.length === 0 ? (
          <span className={styles['project-details']}>
            This project has no publications.
          </span>
        ) : (
          <span className={styles['project-details']}>
            <div>
              {pub_details.map(function (pub) {
                return [
                  <div className={styles['pub-grants-edit-link']}>
                    <strong>{pub.title}</strong>
                    <Link to={`/projects/${projectId}/grants`}>Edit</Link>
                  </div>,
                  <div className={styles['pub-grants-title']}>
                    Author(s):{' '}
                    <span className={styles['pub-grants-info']}>
                      {pub.authors}
                    </span>
                  </div>,
                  <div className={styles['pub-grants-title']}>
                    Publisher:{' '}
                    <span className={styles['pub-grants-info']}>
                      {pub.publisher}
                    </span>
                    Published:{' '}
                    <span className={styles['pub-grants-info']}>
                      {pub.yearPublished}
                    </span>
                    Venue:{' '}
                    <span className={styles['pub-grants-info']}>
                      {pub.venue}
                    </span>
                  </div>,
                  <p className={styles['pub-grants-title']}>
                    <Link to={pub.url}>{pub.url}</Link>
                  </p>,
                ];
              })}
            </div>
          </span>
        )}
      </div>
      <div className={styles['separator']}></div>
      <div>
        <span className={styles['project-detail-header']}>
          Grants
          <Link to={`/projects/${projectId}/grants`} className={styles['link']}>
            + Add Grant
          </Link>
        </span>
        {grant_data.length === 0 ? (
          <span className={styles['project-details']}>
            This project has no grants.
          </span>
        ) : (
          <span className={styles['project-details']}>
            <div>
              {grant_details.map(function (grant) {
                return [
                  <div className={styles['pub-grants-edit-link']}>
                    <strong>{grant.title}</strong>
                    <Link to={`/projects/${projectId}/grants`}>Edit</Link>
                  </div>,
                  <div className={styles['pub-grants-title']}>
                    Grant Number:
                    <span className={styles['pub-grants-info']}>
                      {grant.id}
                    </span>
                  </div>,
                  <div className={styles['pub-grants-title']}>
                    Principle Investigator:
                    <span className={styles['pub-grants-info']}>
                      {grant.piName}
                    </span>
                  </div>,
                  <div className={styles['pub-grants-title']}>
                    <strong>{grant.field}</strong>
                  </div>,
                  <div className={styles['pub-grants-title']}>
                    Funding Agency:{' '}
                    <span className={styles['pub-grants-info']}>
                      {grant.fundingAgency}
                    </span>
                    Award Number:{' '}
                    <span className={styles['pub-grants-info']}>
                      {grant.awardNumber}
                    </span>
                    Award Amount:{' '}
                    <span className={styles['pub-grants-info']}>
                      {grant.awardAmount}
                    </span>
                  </div>,
                  <div className={styles['pub-grants-title']}>
                    Award Dates:
                    <span className={styles['pub-grants-info']}>
                      {formatDate(grant.start)} - {formatDate(grant.end)}
                    </span>
                  </div>,
                ];
              })}
            </div>
          </span>
        )}
      </div>
    </>
  );
};

export default ProjectDetails;
