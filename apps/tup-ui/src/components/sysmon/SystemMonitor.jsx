import React, { useMemo, useEffect } from 'react';
import { useTable } from 'react-table';
import { LoadingSpinner, Message } from '@tacc/core-components';
import { Display, Operational, Load } from './SystemMonitorCells';
import { useSystemMonitor } from '@tacc/tup-ui/hooks';

import styles from './SystemMonitor.module.css';

const SystemMonitor = () => {
  const { systems, isLoading, error } = useSystemMonitor();
  const columns = useMemo(
    () => [
      {
        accessor: 'display_name',
        Header: 'Name',
        Cell: Display,
      },
      {
        accessor: 'is_operational',
        Header: 'Status',
        Cell: Operational,
      },
      {
        accessor: 'load_percentage',
        Header: 'Load',
        Cell: Load,
      },
      {
        accessor: ({ jobs }) => (jobs ? jobs.running : '--'),
        Header: 'Running',
      },
      {
        accessor: ({ jobs }) => (jobs ? jobs.queued : '--'),
        Header: 'Queued',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      columns,
      data: systems,
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
              <th key={column.Header}>{column.render('Header')}</th>
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
                  <td {...cell.getCellProps({ test: cell.column.testProp })}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="5">No systems being monitored</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SystemMonitor;
