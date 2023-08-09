import { UseQueryResult } from '@tanstack/react-query';
import { SystemMonitorRawSystem, SystemQueue } from '.';
import { useGet } from '../requests';

// Query to get system monitor
export const useSystemMonitor = (): UseQueryResult<
  SystemMonitorRawSystem[]
> => {
  const query = useGet<SystemMonitorRawSystem[]>({
    endpoint: '/system_monitor',
    key: ['system_monitor'],
  });
  return query;
};

// Query to get jobs queue for each system
export const useSystemQueue = (
  tas_name: string
): UseQueryResult<SystemQueue> => {
  const query = useGet<SystemQueue>({
    endpoint: `/system_monitor/${tas_name}`,
    key: [`system_monitor/${tas_name}`],
  });
  return query;
};
