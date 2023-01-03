import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectSummaryAll } from './ProjectsCells';
import { useProjects } from '@tacc/tup-hooks';
import { formatDate } from '../utils/timeFormat';

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
            <td>
              <table>
                <tr>
                  <th>Active Resources</th>
                  <th>Awarded</th>
                  <th>Used</th>
                  <th>Expires</th>
                </tr>
                <tbody>
                  <tr>
                    <td>
                      {project.allocations?.map((e) => (
                        <li>{e.resource}</li>
                      ))}
                    </td>
                    <td>
                      {project.allocations?.map((e) => (
                        <li>{e.total}</li>
                      ))}
                    </td>
                    <td>
                      {project.allocations?.map((e) => (
                        <li>{e.used}</li>
                      ))}
                    </td>
                    <td>
                      {project.allocations
                        ?.map((e) => e.end)
                        .map((e) => (
                          <li>{`${formatDate(new Date(e))}`}</li>
                        ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProjectsSummaryListing;
