import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectsRawSystem } from '@tacc/tup-hooks';
import styles from './ProjectsListing.module.css';

const formatDate = (datestring: string): string => {
  const date = new Date(datestring);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const ProjectsListingAllocationTable: React.FC<{
  project: ProjectsRawSystem;
}> = ({ project }) => {
  const location = useLocation();
  const projectStatusNav = new URLSearchParams(location.search).get('show');
  const sortedAllocationSystems = useMemo(() => {
    const allocations = project.allocations || [];
    return allocations.sort((a, b) => {
      if (!a?.end || typeof a.end !== 'string') return -1;
      if (!b?.end || typeof b.end !== 'string') return 1;

      return new Date(a?.end).getTime() - new Date(b?.end).getTime();
    });
  }, [project.allocations]);

  const filteredAllocationSystems = useMemo(() => {
    if (projectStatusNav === 'active' || projectStatusNav === null)
      return sortedAllocationSystems?.filter(
        (allocation) =>
          allocation.status &&
          typeof allocation.status == 'string' &&
          allocation?.status?.toLowerCase() === 'active'
      );
    return sortedAllocationSystems.reverse();
  }, [projectStatusNav, sortedAllocationSystems]);

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
        {filteredAllocationSystems.map((allocation) => (
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
