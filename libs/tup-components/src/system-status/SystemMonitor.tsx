import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import {
  LoadingSpinner,
  InlineMessage,
  SectionTableWrapper,
} from '@tacc/core-components';
import { Display, Operational, Load, TextDisplay } from './SystemMonitorCells';
import { SystemMonitorRawSystem, useSystemMonitor } from '@tacc/tup-hooks';
import styles from './SystemMonitor.module.css';
import { EmptyTablePlaceholder } from '../utils';
import { SystemDetailProps } from '.';

export const isSystemOnline = (rawSystem: SystemMonitorRawSystem): boolean => {
  if (
    !rawSystem?.online ||
    !rawSystem?.reachable ||
    rawSystem?.in_maintenance ||
    rawSystem?.queues_down
  ) {
    return false;
  }
  return true;
};

export const SystemMonitorTable: React.FC<SystemDetailProps> = ({
  tas_name,
  useLinks = true,
}) => {
  const { data: systemMonitorData, isLoading, error } = useSystemMonitor();
  let data = systemMonitorData;
  data = tas_name ? data?.filter((sys) => sys.tas_name === tas_name) : data;
  const initialTableState = tas_name ? { hiddenColumns: ['display_name'] } : {};
  const columns = useMemo<Column<SystemMonitorRawSystem>[]>(
    () => [
      {
        accessor: 'display_name',
        Header: 'System',
        Cell: useLinks ? Display : TextDisplay,
      },
      {
        accessor: isSystemOnline,
        // To display different column headings depending if on Dashboard or in System Status page
        Header: tas_name ? 'System Status' : 'Status',
        Cell: Operational,
      },
      {
        accessor: ({ load }) => (load ? Math.floor(load * 100) : ' -- '),
        Header: 'Load',
        Cell: Load,
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
      data: data ?? [],
      initialState: initialTableState,
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <EmptyTablePlaceholder>
        Unable to gather system information
      </EmptyTablePlaceholder>
    );
  }

  return (
    <table {...getTableProps()} className={`${styles['systems-listing']}`}>
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
              <InlineMessage type="info">
                No systems being monitored
              </InlineMessage>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export const SystemMonitor: React.FC<SystemDetailProps> = ({ tas_name }) => {
  /* To display a title for sys_mon table on dashboard only */
  if (tas_name) return <SystemMonitorTable tas_name={tas_name} />;
  return (
    <SectionTableWrapper header="System Status">
      <SystemMonitorTable />
    </SectionTableWrapper>
  );
};
