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

export const Allocations: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value } }) => <div>{value}</div>;

export const ProjectSummary: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value, row } }) => (
  <div>
    <p>
      <h6>
        <b><Link to={`/projects/${row.original.id}`}>{value}</Link></b>
      </h6>
    </p>
    <p>{'Project Charge Code: '} <b>{row.original.chargeCode}</b></p>
    <p><Pill type='success'>{row.original.pi.firstName + ' ' + row.original.pi.lastName}</Pill></p>
    <p>{'Compute: ' + row.original.allocations?.keys('computeRequested')}</p>

  </div>
);