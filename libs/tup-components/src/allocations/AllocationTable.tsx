import React from 'react';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { useProjects } from '@tacc/tup-hooks';
import { formatDate } from '../utils/timeFormat';

export const AllocationsTable: React.FC<{ projectId: number }>= ({projectId}: {projectId: number}) => {
  const projects = useProjects();
  if (!projects.data) return (<LoadingSpinner/>);
  const project = projects.data.find(prj => prj.id === projectId);

  return (
    <table>
      <thead>
        <tr>
          <th>Systems</th>
          <th>Awarded</th>
          <th>Used</th>
          <th>Expires</th>
        </tr>
      </thead>
      <tbody>
        {project?.allocations?.map((allocation) => (
          <tr key={allocation.id}>
            <th>{allocation.resource}</th>
            <th>{allocation.total}</th>
            <th>{allocation.used}</th>
            <th>{allocation.end.toString()}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (<div>project not found</div>)
};

export default AllocationsTable;