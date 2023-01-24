import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { ProjectsRawSystem } from '@tacc/tup-hooks';

export const ProjectTitle: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value, row } }) => (
  <Link to={`/projects/${row.original.id}`}>{value}</Link>
);

export const PrinInv: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <div>{value}</div>;
