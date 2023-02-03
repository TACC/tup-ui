import { UseQueryResult } from '@tanstack/react-query';
import { SystemMonitorRawSystem } from '.';
import { useGet } from './requests';

const useSystemMonitor = (): UseQueryResult<SystemMonitorRawSystem[]> => {
  const query = useGet<SystemMonitorRawSystem[]>({
    endpoint: '/system_monitor',
    key: ['system_monitor'],
  });
  return query;
};

export default useSystemMonitor;
