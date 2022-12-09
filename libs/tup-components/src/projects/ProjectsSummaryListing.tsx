import React, { useEffect, useMemo } from 'react';
import { useTable, Column, FooterProps, Cell } from 'react-table';
import { LoadingSpinner, InlineMessage } from '@tacc/core-components';
import { ProjectTitle, ProjectSummary, Allocations } from './ProjectsCells';
import {
  ProjectsAllocations,
  ProjectsRawSystem,
  useProjects,
} from '@tacc/tup-hooks';

export const ProjectSummaryListing: React.FC = () => {
  const { data, isLoading, error } = useProjects();

  const columns = useMemo<Column<ProjectsRawSystem>[]>(
    () => [
      {
        accessor: 'title',
        Header: 'Active Projects',
        Cell: ProjectTitle,
        Footer: 'Storage: ' + ' SUs',
        columns: [
          {
            accessor: 'title',
            Header: 'Project Summary',
            Cell: ProjectSummary,
            Footer: 'Compute: ' + ' SUs',
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
    footerGroups,
  } = useTable({
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
                    <tfoot>
                      {' '}
                      {footerGroups.map((footerGroup) => (
                        <td colSpan={2} {...footerGroup.getFooterGroupProps()}>
                          {footerGroup.headers.map((column) => (
                            <td {...column.getFooterProps}>
                              {column.render('Footer')}
                            </td>
                          ))}
                        </td>
                      ))}
                    </tfoot>
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
