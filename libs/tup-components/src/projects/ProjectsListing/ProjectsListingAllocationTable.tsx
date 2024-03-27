import React from 'react';
import { ProjectsRawSystem } from '@tacc/tup-hooks';
import styles from './ProjectsListing.module.css';

const formatDate = (datestring: string): string => {
  const date = new Date(datestring);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const ProjectsListingAllocationTable: React.FC<{
  project: ProjectsRawSystem;
}> = ({ project }) => {
  const allocations = project.allocations || [];

  return (
    <table className={styles['allocations-table']}>
      <thead>
        <tr>
          <th>Systems</th>
          <th>Awarded</th>
          <th>Used</th>
          <th>Status</th>
          <th>Expires</th>
        </tr>
      </thead>
      <tbody>
        {allocations
          .map((allocation) => (
            <tr key={allocation.id}>
              <td>{allocation.resource}</td>
              <td>{allocation.total} SU</td>
              <td>{allocation.used} SU</td>
              <td>{allocation.status ?? '-'}</td>
              <td>{formatDate(allocation.end)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
