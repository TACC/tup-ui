import React from 'react';
import { Pill } from '@tacc/core-components';
import { Renderer, CellProps } from 'react-table';
import { SystemMonitorSystem } from '@tacc/tup-ui/hooks';

type SystemMonitorRenderer<ValueType> = Renderer<
  CellProps<SystemMonitorSystem, ValueType>
>;

export const Display: SystemMonitorRenderer<string> = ({ cell: { value } }) => (
  <strong className="wb-text-primary">{value}</strong>
);

export const Operational: SystemMonitorRenderer<boolean> = ({
  cell: { value },
}) => (
  <>
    {value ? (
      <Pill type="success">Operational</Pill>
    ) : (
      <Pill type="warning">Maintenance</Pill>
    )}
  </>
);

export const Load: SystemMonitorRenderer<number | undefined> = ({
  cell: { value },
}) => <span>{value ? `${value}%` : '--'}</span>;
