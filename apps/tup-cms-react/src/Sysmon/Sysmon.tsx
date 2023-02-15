// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
// import { SystemMonitorRawSystem, useSystemMonitor } from '@tacc/tup-hooks';
// import { LoadingSpinner } from '@tacc/core-components';
import { SystemMonitor } from '@tacc/tup-components';

const Sysmon: React.FC = () => <SystemMonitor />;

/*
Unstyled table if we need it
export const isSystemDown = (rawSystem: SystemMonitorRawSystem): boolean => {
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


export function Sysmon() {
  const { data, isLoading, error } = useSystemMonitor();
  if (isLoading) return <LoadingSpinner />;
  return (
    <table>
      <thead>
        <tr>
          <th>System Name</th>
          <th>Status</th>
          <th>Utilization</th>
          <th>Running</th>
          <th>Waiting</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((sys) => (
          <tr>
            <td>{sys.display_name}</td>
            <td>{isSystemDown(sys) ? 'Operational' : 'Maintenance'}</td>
            <td>{sys.load ? `${Math.floor(sys.load * 100)}%` : '--'}</td>
            <td>{sys.running ?? '--'}</td>
            <td>{sys.waiting ?? '--'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
*/
export default Sysmon;
