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
import { debug } from 'console';

export const isSystemDown = (rawSystem: SystemMonitorRawSystem): boolean => {
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

export const SystemMonitor: React.FC<{ display_name?: Array<string> }> = () => {
  const { data, isLoading, error } = useSystemMonitor();
  const columns = useMemo<Column<SystemMonitorRawSystem>[]>(
    () => [
      {
        accessor: 'display_name',
        Header: 'System',
        Cell: Display,
      },
      {
        accessor: ({ isOperational }) => isSystemDown,
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
      <InlineMessage type="warning" className={'error'}>
        Unable to gather system information
      </InlineMessage>
    );
  }

  return (
    <SectionTableWrapper header="System Status">
      <table
        {...getTableProps()}
        // Emulate <InfiniteScrollTable> and its use of `o-fixed-header-table`
        // TODO: Create global table styles & Make <InfiniteScrollTable> use them
        className={`multi-system o-fixed-header-table ${styles['root']}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={styles['header']}
            >
              {headerGroup.headers.map((column) => (
                <th key={column.id}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles['rows']}>
          {rows.length ? (
            rows.map((row, idx) => {
              // removes Longhorn system now that it's retired. Can remove when it's taken off TAP system endpoint
              rows.filter((rows) => !{ rows: { display_name: 'Longhorn' } });
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
              <td colSpan={5}>No systems being monitored</td>
            </tr>
          )}
        </tbody>
      </table>
    </SectionTableWrapper>
  );
};
