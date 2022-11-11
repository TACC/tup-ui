import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { LoadingSpinner, Message } from '@tacc/core-components';
import { ProjectTitle, PrinInv, Allocations } from './ProjectsCells';
import { ProjectsRawSystem, useProjects } from '@tacc/tup-hooks';
import styles from './Projects.module.css';

export const ProjectsTable: React.FC = () => {
  const { data, isLoading, error } = useProjects();

  const columns = useMemo<Column<ProjectsRawSystem>[]>(
    () => [
      {
        accessor: 'title',
        Header: 'Project Title',
        Cell: ProjectTitle,
      },
      {
        accessor: ({ pi }) => (pi.firstName + " " + pi.lastName),
        Header: 'Principle Investigator',
        Cell: PrinInv,
      },
      {
        accessor: ({ allocations }) => (allocations ? 
          allocations.map((e) => e.resource).join(', ') : '--'),
        Header: 'Active Allocations',
        Cell: Allocations,
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
    <Message type="warn">
      No active projects were found.
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

export default ProjectsTable;
