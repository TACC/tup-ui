import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { LoadingSpinner, Message } from '@tacc/core-components';
import { Display, Operational, Load } from './ActiveProjectsCells';
import { ActiveProjectsSystem, useActiveProjects } from '@tacc/tup-hooks';
import styles from './ActiveProjects.module.css';

const ActiveProjects: React.FC<{ hosts?: Array<string> }> = ({ hosts }) => {
  const { systems, isLoading, error } = useActiveProjects(hosts);
  const columns = useMemo<Column<ActiveProjectsSystem>[]>(
    () => [
      {
        accessor: 'project_title',
        Header: 'Project Title',
        // Cell: Display,
      },
      {
        accessor: 'principle_investigator',
        Header: 'Principle Investigator',
        // Cell: Operational,
      },
      // {
      //   accessor: ({ active_allocations }) => (active_allocations ? active_allocations.id : '--'),
      //   Header: 'Active Allocations',
      //   // Cell: Load,
      // },
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
    <Message type="warn">
      No can do Kangaroo
    </Message>
  );
}
  return (
    <table
    {...getTableProps()}
    className={`multi-system InfiniteScrollTable o-fixed-header-table ${['root']}`}
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

export default ActiveProjects;
