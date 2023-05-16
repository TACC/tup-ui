import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import {
  LoadingSpinner,
  InlineMessage,
  SectionTableWrapper,
} from '@tacc/core-components';
import { Display, Operational, Load } from './SystemMonitorCells';
import { SystemMonitorRawSystem, useSystemMonitor } from '@tacc/tup-hooks';
import styles from './SystemMonitor.module.css';
import { EmptyTablePlaceholder } from '../utils';

export const isSystemOnline = (rawSystem: SystemMonitorRawSystem): boolean => {
  if (
    !rawSystem?.online ||
    !rawSystem?.reachable ||
    rawSystem?.in_maintenance ||
    rawSystem?.queues_down
  ) {
    return false;
  }
  return true;
};

export const SystemMonitorTable: React.FC = () => {
  const { data, isLoading, error } = useSystemMonitor();
  const columns = useMemo<Column<SystemMonitorRawSystem>[]>(
    () => [
      {
        accessor: 'display_name',
        Header: 'System',
        Cell: Display,
      },
      {
        accessor: isSystemOnline,
        Header: 'Status',
        Cell: Operational,
      },
      {
        accessor: ({ load }) => (load ? Math.floor(load * 100) : ' -- '),
        Header: 'Utilization',
        Cell: Load,
      },
      {
        accessor: ({ running }) => (running ? running : ' 0 '),
        Header: 'Running',
      },
      {
        accessor: ({ waiting }) => (waiting ? waiting : ' 0 '),
        Header: 'Waiting',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      columns,
      data: data ?? [],
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <EmptyTablePlaceholder>
        Unable to gather system information
      </EmptyTablePlaceholder>
    );
  }

  return (
    <table
      {...getTableProps()}
      className={`o-fixed-header-table ${styles.root}`}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.id}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length ? (
          rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <InlineMessage type="info">
                No systems being monitored
              </InlineMessage>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export const SystemMonitor = () => {
  return (
    <SectionTableWrapper header={'System Monitor'}>
      <SystemMonitorTable />
    </SectionTableWrapper>
  );
};
