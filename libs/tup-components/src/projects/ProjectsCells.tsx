import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { ProjectsRawSystem } from '@tacc/tup-hooks';

export const ProjectTitle: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value, row } }) => (
  <Link to={`/tickets/${row.original.id}`}>{value}</Link>
);

export const PrinInv: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <strong className="wb-text-primary">{value}</strong>;

export const Allocations: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value } }) => (
  <strong className="wb-text-primary">{value}</strong>
);
