import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectSummaryAll } from './ProjectsCells';
import { useProjects } from '@tacc/tup-hooks';
import { formatDate } from '../utils/timeFormat';
import styles from './ProjectsSummaryListing.module.css';

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
                <tbody className={styles['rows']}>
                  <tr>
                    <td>
                      {project.allocations?.map((e) => e.resource).join('\n')}
                    </td>
                    <td>
                      {project.allocations?.map((e) => e.total).join('\n')}
                    </td>
                    <td>
                      {project.allocations?.map((e) => e.used).join('\n')}
                    </td>
                    <td>
                      {project.allocations
                        ?.map((e) => e.end)
                        .map((e) => `${formatDate(new Date(e))}`)
                        .join('\n')}
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
