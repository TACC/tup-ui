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
  cell: Cell<ProjectsRawSystem>;
}> = ({ cell: { value, row } }) => (
  <div>
    <Link to={`/projects/${row.original.id}`}>{value}</Link>
    <div>
      {'Project Charge Code: '} {row.original.chargeCode}
    </div>
    <Pill type="success">
      {'Principle Investigator: ' +
        row.original.pi.firstName +
        ' ' +
        row.original.pi.lastName}
    </Pill>
  </div>
);
