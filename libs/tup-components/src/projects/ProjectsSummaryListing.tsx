import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { LoadingSpinner, InlineMessage, SectionTableWrapper } from '@tacc/core-components';
import { ProjectTitle, ProjectSummary } from './ProjectsCells';
import {
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
        columns: [
          {
            accessor: 'title',
            Header: 'Project Summary',
            Cell: ProjectSummary,
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
    <SectionTableWrapper>
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
                    </td>
                  ))}
                </tr>
            )})
          ) : (
            <tr>
              <td colSpan={5}>No active projects found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </SectionTableWrapper>
  );
};
export default ProjectSummaryListing;
