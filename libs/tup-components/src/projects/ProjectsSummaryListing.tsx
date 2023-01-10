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
    <table>
      <tbody>
        {data?.map((project) => (
          <tr>
            <td>
              <ProjectSummaryAll project={project} key={project.id} />
            </td>
            <td>TODO: Load project-specific Allocations table.</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProjectsSummaryListing;
 