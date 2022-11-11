import React from 'react';
import { Pill } from '@tacc/core-components';
import { Cell } from 'react-table';
import { ProjectsRawSystem } from '@tacc/tup-hooks';

export const ProjectTitle: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <strong className="wb-text-primary">{value}</strong>;

export const PrinInv: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
    cell: { value },
  }) => <strong className="wb-text-primary">{value}</strong>;

export const Allocations: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <strong className="wb-text-primary">{value}</strong>;
