import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectSummaryAll } from './ProjectsCells';
import { useProjects } from '@tacc/tup-hooks';

export const ProjectsSummaryListing: React.FC = () => {
  const { data, isLoading, error } = useProjects();
  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <InlineMessage type="warning">Unable to retrieve projects.</InlineMessage>
    );
  return (
    <div>
      {data?.map((project) => (
        <div key={project.id}>
          <ProjectSummaryAll project={project} />
        </div>
      ))}
    </div>
  );
};
export default ProjectsSummaryListing;
