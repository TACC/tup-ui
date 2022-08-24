import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';
import {
  SystemMonitorSystem,
  SystemMonitorRaw,
  SystemMonitorRawSystem,
} from '.';
import { useGet } from './requests';

const getSystemDisplayName = (hostname: string): string => {
  const first = hostname.split('.')[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
};

const getSystemType = (
  rawSystem: SystemMonitorRawSystem
): 'compute' | 'storage' => (!!rawSystem.jobs ? 'compute' : 'storage');

const wasUpdatedRecently = (timestamp: string): boolean => {
  const updated = new Date(timestamp).getTime();
  const now = new Date().getTime();
  return now - 600000 > updated;
};

const isSystemUp = (rawSystem: SystemMonitorRawSystem): boolean => {
  if (getSystemType(rawSystem) === 'compute') {
    if (!rawSystem.load || !rawSystem.jobs) {
      return false;
    }
    if (rawSystem.load * 100 > 99 || !rawSystem.jobs.running) {
      return false;
    }
  }
  if (
    rawSystem.tests &&
    Object.values(rawSystem.tests).some(
      (test) => !test.status || !wasUpdatedRecently(test.timestamp)
    )
  ) {
    return false;
  }
  return true;
};

type UseSystemMonitorResult = {
  systems: Array<SystemMonitorSystem>;
} & UseQueryResult<SystemMonitorRaw>;

// Query to retrieve the user's profile object.
const useSystemMonitor = (
  systemList: Array<string> = [
    'frontera.tacc.utexas.edu',
    'stampede2.tacc.utexas.edu',
    'maverick2.tacc.utexas.edu',
    'longhorn.tacc.utexas.edu',
  ]
): UseSystemMonitorResult => {
  const query = useGet<SystemMonitorRaw>({
    endpoint: '/sysmon',
    key: 'sysmon',
    baseUrl: 'http://localhost',
  });
  const { data } = query;
  const systems = useMemo<Array<SystemMonitorSystem>>(() => {
    const result: Array<SystemMonitorSystem> = [];
    systemList.forEach((system) => {
      if (!data?.[system]) {
        result.push({
          hostname: system,
          display_name: getSystemDisplayName(system),
          is_operational: false,
          load_percentage: 0,
          jobs: {
            running: 0,
            queued: 0,
            other: 0,
          },
        });
        return;
      }
      const rawSystem = data[system];
      const isCompute = getSystemType(rawSystem) === 'compute';
      result.push({
        hostname: rawSystem.hostname,
        display_name: rawSystem.displayName,
        is_operational: isSystemUp(rawSystem),
        load_percentage: isCompute ? rawSystem.load * 100 : undefined,
        jobs: isCompute ? rawSystem.jobs : undefined,
      });
    });
    return result;
  }, [data]);
  return { systems, ...query };
};

export default useSystemMonitor;
