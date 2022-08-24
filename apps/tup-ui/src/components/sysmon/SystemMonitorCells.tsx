import React from 'react';
import { Pill } from '@tacc/core-components';
import { Renderer, CellProps } from 'react-table';
import { SystemMonitorSystem } from '../../hooks';

type SystemMonitorRenderer<ValueType> = Renderer<
  CellProps<SystemMonitorSystem, ValueType>
>;

export const Display: SystemMonitorRenderer<string> = ({ cell: { value } }) => (
  <strong className="wb-text-primary">{value}</strong>
);

export const Operational: SystemMonitorRenderer<boolean> = ({
  cell: { value },
}) => {
  if (value) {
    return <Pill type="success">Operational</Pill>;
  }
  return <Pill type="warning">Maintenance</Pill>;
};

export const Load: SystemMonitorRenderer<number | undefined> = ({
  cell: { value },
}) => <span>{value ? `${value}%` : '--'}</span>;
