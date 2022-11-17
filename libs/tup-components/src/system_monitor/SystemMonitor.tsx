import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { LoadingSpinner, Message } from '@tacc/core-components';
import { Display, Operational, Load } from './SystemMonitorCells';
import { SystemMonitorRawSystem, useSystemMonitor } from '@tacc/tup-hooks';
import styles from './SystemMonitor.module.css';

const isSystemDown = (rawSystem: SystemMonitorRawSystem): boolean => {
  if (
    !rawSystem?.online ||
    !rawSystem?.reachable ||
    rawSystem?.in_maintenance ||
    rawSystem?.in_maintenance
  ) {
    return false;
  }
  return true;
};

const SystemMonitor: React.FC<{ display_name?: Array<string> }> = () => {
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
        accessor: ({ load }) => (load ? Math.floor(load * 100) : '--'),
        Header: 'Utilization',
        Cell: Load,
      },
      {
        accessor: ({ running }) => (running ? running : '--'),
        Header: 'Running',
      },
      {
        accessor: ({ waiting }) => (waiting ? waiting : '--'),
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
      <Message type="warn" className={styles['error']}>
        Unable to gather system information
      </Message>
    );
  }

  return (
    <table
      {...getTableProps()}
      // Emulate <InfiniteScrollTable> and its use of `o-fixed-header-table`
      // TODO: Create global table styles & Make <InfiniteScrollTable> use them
      className={`multi-system InfiniteScrollTable o-fixed-header-table ${styles['root']}`}
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
  );
};

export default SystemMonitor;
