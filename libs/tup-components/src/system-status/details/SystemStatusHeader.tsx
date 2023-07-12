import React from 'react';
import { useSystemMonitor } from '@tacc/tup-hooks';
import styles from './SystemStatusHeader.module.css';
import {
  LoadingSpinner,
  SectionHeader,
  InlineMessage,
} from '@tacc/core-components';
import { SystemDetailProps } from '.';

export const SystemStatusHeader: React.FC<SystemDetailProps> = ({
  tas_name = 'frontera',
}) => {
  const { data, isLoading, error } = useSystemMonitor();
  const dataBySystem = data?.find((system) => system.tas_name === tas_name);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <SectionHeader className={`${styles['system-header']}`}>
        <InlineMessage type="warn">
          System Status / Unable to retrieve system name
        </InlineMessage>
      </SectionHeader>
    );

  return (
    <SectionHeader className={`${styles['system-header']}`}>
      System Status / {dataBySystem?.display_name}
    </SectionHeader>
  );
};
