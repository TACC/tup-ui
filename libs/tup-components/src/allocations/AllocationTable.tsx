import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { LoadingSpinner, InlineMessage, InfiniteScrollTable } from '@tacc/core-components';
import { ProjectsRawSystem, useProjects, ProjectsAllocations, useProjectsAllocations } from '@tacc/tup-hooks';
import { DateExpires } from './AllocationCells';
import styles from './Allocation.module.css';

// export const AllocationsTable: React.FC = () => {
//   const { data, isLoading, error } = useProjectsAllocations();
//   const columns = useMemo<Column<ProjectsAllocations>[]>(
//     () => [
//         {
//           accessor: 'resource',
//           Header: 'Active Resources',
//           // Cell: Allocations,
//         },
//         {
//           accessor: 'total',
//           Header: 'Awarded',
//         },
//         {
//           accessor: 'used',
//           Header: 'Used',
//         },
//         {
//           accessor: 'end',
//           Header: 'Expires',
//           // Cell: DateExpires,
//         },
//       ],
//       []
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
    <div>
      {data?.map(project => project.allocations.map(e =>{
        return (
          <table className={styles['usage-table']}>
            <thead>
              <tr>
                <th>Active Resources</th>
                <th>Awarded</th>
                <th>Used</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <th>{project.allocations?.map(e => e.resource)}</th>
                  <th>{project.allocations?.map(e => e.total)}</th>
                  <th>{project.allocations?.map(e => e.used)}</th>
                </tr>            
            </tbody>
          </table>
        )
      }))}
    </div>
  )};

//   return (
//     <table className={styles['usage-table']}>
//       <thead>
//         <tr>
//           <th>Active Resources</th>
//           <th>Awarded</th>
//           <th>Used</th>
//           <th>Expires</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data?.map((allocation) => (
//           <tr key={allocation.resource}>
//             <th>{allocation.resource}</th>
//             <th>{allocation.total}</th>
//             <th>{allocation.used}</th>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

//     return (
//     <div className="o-fixed-header-table">
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()} className={styles['rows']}>
//           {rows.length ? (
//             rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={5}>No active projects found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
