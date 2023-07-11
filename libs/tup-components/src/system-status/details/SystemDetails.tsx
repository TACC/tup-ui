import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { EmptyTablePlaceholder } from '../../utils';
import {
  LoadingSpinner,
  SectionTableWrapper,
  Pill,
} from '@tacc/core-components';
import { JobsQueue, useSystemQueue } from '@tacc/tup-hooks';
import styles from './SystemDetails.module.css';
import { SystemMonitor } from '../SystemMonitor';
import { SystemDetailProps } from '.';

const SystemQueueTable: React.FC<SystemDetailProps> = ({
  tas_name = 'frontera'
}) => {
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
        Header: 'Idle Nodes',
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
    <table {...getTableProps()} className={`${styles['systems-listing']} o-fixed-header-table`}>
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
              <tr {...row.getRowProps()}>
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

export const SystemDetails: React.FC<SystemDetailProps> = ({
  tas_name = 'frontera'
}) => {
  return (
      <div className={styles['panels']}>
        <SystemMonitor tas_name={tas_name} />
        <SectionTableWrapper contentShouldScroll>
          <SystemQueueTable tas_name={`${tas_name}`} />
        </SectionTableWrapper>
        {/* TODO: When avgwait table exists, update CSS grid to show it */}
        {/* <div>Avg. Wait Time</div> */}
      </div>
  );
};

