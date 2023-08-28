import React from 'react';
import { Pill } from '@tacc/core-components';
import { Cell } from 'react-table';
import { Link } from 'react-router-dom';
import { SystemMonitorRawSystem } from '@tacc/tup-hooks';

export const Display: React.FC<{
  cell: Cell<SystemMonitorRawSystem, string>;
}> = ({ cell: { row } }) => (
  <Link to={`/system-status/${row.original.tas_name}`}>
    {row.original.display_name}
  </Link>
);

export const TextDisplay: React.FC<{
  cell: Cell<SystemMonitorRawSystem, string>;
}> = ({ cell: { row } }) => {
  return row.original.display_name;
};

export const Operational: React.FC<{
  cell: Cell<SystemMonitorRawSystem, boolean>;
}> = ({ cell: { value } }) => {
  if (value) {
    return <Pill type="normal">Operational</Pill>;
  }
  return <Pill type="warning">Maintenance</Pill>;
};

export const Load: React.FC<{
  cell: Cell<SystemMonitorRawSystem, number | undefined>;
}> = ({ cell: { value } }) => <span>{value ? `${value}%` : '--'}</span>;
