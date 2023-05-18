import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { EmptyTablePlaceholder } from '../../utils';
import {
  LoadingSpinner,
  SectionTableWrapper,
  Pill,
  Button,
} from '@tacc/core-components';
import { JobsQueue, useSystemQueue } from '@tacc/tup-hooks';
import styles from './SystemDetails.module.css';

const SystemQueueTable: React.FC<{
  tas_name: string;
}> = ({ tas_name }) => {
  const { data: systemData, isLoading } = useSystemQueue(tas_name);
  const system: JobsQueue[] =
    systemData?.queues?.filter((queue) => !queue.hidden) ?? [];
  const columns = useMemo<Column<JobsQueue>[]>(
    () => [
      {
        accessor: 'name',
        Header: 'Queue',
      },
      {
        accessor: ({ down }) =>
          down ? (
            <Pill type="warning">Closed</Pill>
          ) : (
            <Pill type="normal">Open</Pill>
          ),
        Header: 'Status',
      },
      {
        accessor: 'free',
        Header: 'Free Nodes',
      },
      {
        accessor: ({ running }) => (running ? running : ' 0 '),
        Header: 'Running Jobs',
      },
      {
        accessor: ({ waiting }) => (waiting ? waiting : ' 0 '),
        Header: 'Waiting Jobs',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      columns,
      data: system ?? [],
    });

  if (isLoading) return <LoadingSpinner />;

  return (
    <table
      {...getTableProps()}
      className={`o-fixed-header-table ${styles['systems-table']}`}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column.id}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length ? (
          rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr
                className={styles['system-listing-row']}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <EmptyTablePlaceholder>
                System job queues are unavailable
              </EmptyTablePlaceholder>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
const ViewMonitor = () => (
  <a href="/portal/system_monitor">
    <Button type="primary">View All Systems</Button>
  </a>
);

const SystemDetails: React.FC<{
  tas_name: string;
}> = ({ tas_name }) => {
  const { data: systemData, isLoading, error } = useSystemQueue(tas_name);
  // const system =
  if (isLoading) return <LoadingSpinner />;
  return (
    systemData && (
      <SectionTableWrapper
        header={`${systemData.display_name} Queues`}
        headerActions={
          <a href="/portal/system_monitor">
            <Button type="primary">View All Systems</Button>
          </a>
        }
      >
        <SystemQueueTable tas_name={`${tas_name}`} />
      </SectionTableWrapper>
    )
  );
};

export default SystemDetails;
