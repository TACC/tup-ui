import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectSummaryAll } from './ProjectsCells';
import { ProjectsRawSystem, useProjects } from '@tacc/tup-hooks';

export const ProjectSummaryListing: React.FC = () => {
  const { data, isLoading, error } = useProjects();
  const totalAllocations = data?.map((e) => {
    e.totalStorageRequested = e.allocations?.reduce(
      (acc, e) => acc + e.storageRequested,
      0
    );
    e.totalStorageUsed = e.allocations?.reduce(
      (acc, e) => acc + e.storageUsed,
      0
    );
    e.totalComputeRequested = e.allocations?.reduce(
      (acc, e) => acc + e.computeRequested,
      0
    );
    e.totalComputeUsed = e.allocations?.reduce((acc, e) => acc + e.used, 0);
    return e;
  });

  const columns = useMemo<Column<ProjectsRawSystem>[]>(
    () => [
      {
        accessor: 'title',
        Header: 'Project Summary',
        Cell: ProjectSummaryAll,
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
      <InlineMessage type="warn">Unable to retrieve projects.</InlineMessage>
    );
  }
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return column.isVisible === true ? null : (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              );
            })}
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
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                    {`Compute: ${
                      totalAllocations
                        ? totalAllocations[idx].totalComputeRequested
                        : '--'
                    } SUs `}

                    {row.original.totalComputeRequested &&
                    row.original.totalComputeUsed
                      ? ' (' +
                        (
                          (row.original.totalComputeUsed /
                            row.original.totalComputeRequested) *
                          100
                        ).toFixed(0) +
                        '  % Used) '
                      : ' (0% Used) '}
                    {`Storage: ${
                      totalAllocations
                        ? totalAllocations[idx].totalStorageRequested
                        : '--'
                    } GBs `}
                    {row.original.totalStorageRequested &&
                    row.original.totalStorageUsed
                      ? ' (' +
                        (
                          (row.original.totalStorageUsed /
                            row.original.totalStorageRequested) *
                          100
                        ).toFixed(0) +
                        '  % Used) '
                      : ' (0% Used) '}
                  </td>
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
  );
};
export default ProjectSummaryListing;
