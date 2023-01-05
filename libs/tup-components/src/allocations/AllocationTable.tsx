import React from 'react';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { useProjects } from '@tacc/tup-hooks';
import { formatDate } from '../utils/timeFormat';

export const AllocationsTable: React.FC = () => {
  const { data, isLoading, error } = useProjects();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <InlineMessage type="warning">
        Unable to retrieve allocation information.
      </InlineMessage>
    );
  }

  return (
    <>
      {data?.map((project) => (
        <table>
          <thead>
            <tr>
              <th>Active Resources</th>
              <th>Awarded</th>
              <th>Used</th>
              <th>Expires</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul>
                  {project.allocations?.map((e) => (
                    <li>{e.resource}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {project.allocations?.map((e) => (
                    <li>{e.total}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {project.allocations?.map((e) => (
                    <li>{e.used}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {project.allocations
                    ?.map((e) => e.end)
                    .map((e) => (
                      <li>{formatDate(new Date(e))}</li>
                    ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};
