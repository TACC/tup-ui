import { UseQueryResult } from 'react-query';
import { SystemMonitor } from '.';
import { useGet } from './requests';

// Query to retrieve the user's profile object.
const useSystemMonitor = (): UseQueryResult<SystemMonitor> => {
  const query = useGet<SystemMonitor>({
    endpoint: '/sysmon/index.json',
    key: 'sysmon',
    baseUrl: 'http://localhost',
  });
  return query;
};

export default useSystemMonitor;
