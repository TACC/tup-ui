import React from 'react';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { useProjects } from '@tacc/tup-hooks';
import { formatDate } from '../utils/timeFormat';
import styles from './Allocation.module.css';

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
              <th>{project.allocations?.map((e) => e.resource).join('\n')}</th>
              <th>{project.allocations?.map((e) => e.total).join('\n')}</th>
              <th>{project.allocations?.map((e) => e.used).join('\n')}</th>
              <th>
                {project.allocations
                  ?.map((e) => e.end)
                  .map((e) => `${formatDate(new Date(e))}`)
                  .join('\n')}
              </th>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};
