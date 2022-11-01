import React from 'react';
import { Pill } from '@tacc/core-components';
import { Cell } from 'react-table';
import { SystemMonitorSystem } from '@tacc/tup-hooks';

export const Display: React.FC<{ cell: Cell<SystemMonitorSystem, string> }> = ({
  cell: { value },
}) => <strong className="wb-text-primary">{value}</strong>;

export const Operational: React.FC<{
  cell: Cell<SystemMonitorSystem, boolean>;
}> = ({ cell: { value } }) => {
  if (value) {
    return <Pill type="success">Operational</Pill>;
  }
  return <Pill type="warning">Maintenance</Pill>;
};

export const Load: React.FC<{
  cell: Cell<SystemMonitorSystem, number | undefined>;
}> = ({ cell: { value } }) => <span>{value ? `${value}%` : '--'}</span>;
