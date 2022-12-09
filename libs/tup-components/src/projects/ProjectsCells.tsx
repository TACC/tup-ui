import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { ProjectsRawSystem, ProjectsAllocations } from '@tacc/tup-hooks';
import { Pill } from '@tacc/core-components';

export const ProjectTitle: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value, row } }) => (
  <Link to={`/projects/${row.original.id}`}>{value}</Link>
);

export const PrinInv: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <div>{value}</div>;

export const Allocations: React.FC<{
  cell: Cell<ProjectsRawSystem, number>;
}> = ({ cell: { value, row } }) => (
  <tr>
    <td>{'Compute: ' + row.original.allocations}</td>
  </tr>
);

export const ProjectSummary: React.FC<{
  cell: Cell<ProjectsRawSystem>;
}> = ({ cell: { value, row } }) => (
  <div>
    <h6>
      <b>
        <Link to={`/projects/${row.original.id}`}>{value}</Link>
      </b>
    </h6>
    {'Project Charge Code: '} <b>{row.original.chargeCode}</b>
    <p>
      <Pill type="success">
        {'Principle Investigator: '}
        <b>{row.original.pi.firstName + ' ' + row.original.pi.lastName}</b>
      </Pill>
    </p>
  </div>
);
