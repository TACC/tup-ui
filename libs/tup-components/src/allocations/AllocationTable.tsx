import React, { useMemo } from 'react';
import { useTable, Column, useSortBy } from 'react-table';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectsRawSystem, useProjects, ProjectsAllocations, useProjectsAllocations } from '@tacc/tup-hooks';
import { DateExpires } from './AllocationCells';
import styles from './Allocation.module.css';

// export const AllocationsTable: React.FC = () => {
//   const { data, isLoading, error } = useProjectsAllocations();
//   const columns = useMemo<Column<ProjectsAllocations>[]>(
//     () => [
//       {
//         accessor: 'id',
//         Header: 'ID',
//       },
//       {
//         accessor: 'resource',
//         Header: 'Resource',
//       },
//     ],
//     []
//   );

export const AllocationsTable: React.FC = () => {
const { data, isLoading, error } = useProjects();
const columns = useMemo<Column<ProjectsRawSystem>[]>(
    () => [
      {
        accessor: ({ allocations }) =>
          allocations ? allocations.map((e) => e.resource).join('\n') : '--',
        Header: 'Active Resources',
        // Cell: Allocations,
      },
      {
        accessor: ({ allocations }) =>
        allocations ? allocations.map((e) => e.total).join('\n') : '--',
        Header: 'Awarded',
      },
      {
        accessor: ({ allocations }) =>
        allocations ? allocations.map((e) => e.used).join('\n') : '--',
        Header: 'Used',
      },
      {
        accessor: ({ allocations }) =>
        allocations ? allocations.map((e) => e.end).join(', ') : '--',
        Header: 'Expires',
        Cell: DateExpires,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      columns,
      data: data ?? [],
    },
    useSortBy,
    );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <InlineMessage type="warn">Unable to retrieve projects.</InlineMessage>
    );
  }
  return (
    <div className="o-fixed-header-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles['rows']}>
          {rows.length ? (
            rows.map((row) => {
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
              <td colSpan={5}>No active projects found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
