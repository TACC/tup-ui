import React from 'react';
import { Pill } from '@tacc/core-components';
import { Cell } from 'react-table';
import { ActiveProjectsSystem } from '@tacc/tup-hooks';

export const Display: React.FC<{ cell: Cell<ActiveProjectsSystem, string> }> = ({
  cell: { value },
}) => <strong className="wb-text-primary">{value}</strong>;

export const Operational: React.FC<{ cell: Cell<ActiveProjectsSystem, string> }> = ({
    cell: { value },
  }) => <strong className="wb-text-primary">{value}</strong>;

export const Load: React.FC<{ cell: Cell<ActiveProjectsSystem, string> }> = ({
  cell: { value },
}) => <strong className="wb-text-primary">{value}</strong>;
