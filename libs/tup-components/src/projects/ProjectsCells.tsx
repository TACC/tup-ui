import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { ProjectsRawSystem } from '@tacc/tup-hooks';
import { Pill } from '@tacc/core-components';

export const ProjectTitle: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value, row } }) => (
  <Link to={`/projects/${row.original.id}`}>{value}</Link>
);

export const PrinInv: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <div>{value}</div>;

export const ProjectSummaryAll: React.FC<{
  project: ProjectsRawSystem;
}> = ({ project }) => {
  const totalStorage =
    project.allocations?.reduce((acc, e) => acc + e.storageQuota, 0) ?? 0;
  const totalStorageUsed =
    project.allocations?.reduce((acc, e) => acc + e.storageUsed, 0) ?? 0;
  const totalCompute =
    project.allocations?.reduce((acc, e) => acc + e.total, 0) ?? 0;
  const totalComputeUsed =
    project.allocations?.reduce((acc, e) => acc + e.used, 0) ?? 0;

  return (
    <div>
      <Link to={`/projects/${project.id}`}>{project.title}</Link>
      <div>
        {'Project Charge Code: '} {project.chargeCode}
      </div>
      <Pill type="success">
        {'Principle Investigator: ' +
          project.pi.firstName +
          ' ' +
          project.pi.lastName}
      </Pill>
      <div>{`Compute: ${totalCompute ? totalCompute : '--'} SUs `}</div>
      <div>
        {totalComputeUsed
          ? ' (' +
            ((totalComputeUsed / totalCompute) * 100).toFixed(0) +
            '  % Used) '
          : ' (0% Used) '}
      </div>
      <div>{`Storage: ${totalStorage ? totalStorage : '--'} GBs `}</div>
      <div>
        {totalStorageUsed
          ? ' (' +
            ((totalStorageUsed / totalStorage) * 100).toFixed(0) +
            '  % Used) '
          : ' (0% Used) '}
      </div>
    </div>
  );
};
