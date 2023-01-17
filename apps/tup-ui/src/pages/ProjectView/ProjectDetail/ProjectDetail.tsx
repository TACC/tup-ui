import { Section } from '@tacc/core-components';
import { PageLayout } from '@tacc/tup-components';
import { useProjects, usePublications, useGrants } from '@tacc/tup-hooks';
import { da } from 'date-fns/locale';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, NavItem } from '@tacc/core-wrappers';


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
        Abstract: 
        {projectDetails?.description}
      </div>
      <div>
        Publications:
         {pub_details === undefined ? 'This project has no publications' : 
         (pub_details?.title, 
          pub_details?.authors, 
          pub_details.publisher, 
          pub_details.venue, 
          pub_details.yearPublished, 
          pub_details.url)}
      </div>
      <div>
        Grants: 
        {grant_details === undefined ? 'This project has no grants' : 
          (grant_details?.title,
            grant_details.piName,
            grant_details.fundingAgency,
            grant_details.awardNumber
          )}
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
