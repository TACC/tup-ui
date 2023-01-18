import { Section } from '@tacc/core-components';
import { useProjects, usePublications, useGrants } from '@tacc/tup-hooks';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProjectDetails.module.css'


export const ProjectDetails: React.FC<{ projectId: number }> = ({ projectId }) => {
  const details = useProjects();
  const data = details.data ?? [];
  const projectDetails = data.find((desc) => desc.id === projectId)
  
  const publications = usePublications(projectId);
  const pub = publications.data ?? [];
  const pub_details = pub.find((publ) => publ.id === projectId)
  
  const grants = useGrants(projectId);
  const grant_data = grants.data ?? [];
  const grant_details = grant_data.find((grant: { id: number; }) => grant.id === projectId)

  return (
    <>
      <div>
        <span className={styles['project-detail-header']}>Abstract</span>
        <span className={styles['project-details']}>
          {projectDetails?.description}
        </span>
      </div>
      <div>
      <span className={styles['project-detail-header']}>Publications</span>
         {pub_details === undefined ? 
         <span className={styles['project-details']}>
           This project has no publications
         </span> : 
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
         }
      </div>
      <div>
      <span className={styles['project-detail-header']}>Grants</span> 
        {grant_details === undefined ? 
        <span className={styles['project-details']}>
          This project has no grants
        </span> : 
        <span>
          <span className={styles['project-details-bold']}>
            {grant_details?.title}
          </span>
          <span>Principle Investigator:</span>{' '}
          {grant_details?.title}
          <span>{grant_details?.field}</span>
          <span>Funding Agency:</span>{' '}
          {grant_details?.fundingAgency}
          <span>Award Number:</span>{' '}
          {grant_details?.awardNumber}
        </span>
          }
      </div>
    </>
  )
}
    
const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) return <div>No project selected.</div>;

  return (
    <Section
      header={`Project Detail: ${projectId}`}
      content={
      <div>
        {<ProjectDetails projectId={parseInt(projectId)} />}
          
      </div>}
    ></Section>
  );
};

export default ProjectDetail;
