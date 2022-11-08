import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';
import { 
    ActiveProjectsSystem,
    ActiveProjectsRaw,
    ActiveProjectsRawSystem, } from '.';
import { useGet } from './requests';

const getActiveProjectName = (title: string): string => {
    const first = title.split('.')[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  };
  
  type UseActiveProjectsResult = {
    systems: Array<ActiveProjectsSystem>;
  } & UseQueryResult<ActiveProjectsRaw>;
  
  // Query to retrieve the user's profile object.
  const useActiveProjects = (
    hosts: Array<string> = [
      'Project 1',
    ]
  ): UseActiveProjectsResult => {
    const query = useGet<ActiveProjectsRaw>({
      endpoint: '/activeprojects',              // '/activeprojects' does not show table
      key: 'activeprojects',                    // 'activeprojects' does not show table
    });
    const { data } = query;
    const systems = useMemo<Array<ActiveProjectsSystem>>(() => {
      const result: Array<ActiveProjectsSystem> = [];
      hosts.forEach((host) => {
        if (!data?.[host]) {
          result.push({
            hostname: host,
            project_title: getActiveProjectName(host),
            principle_investigator: getActiveProjectName(host),
            active_allocations: { id: 0} ,
          });
          return;
        }
        const rawSystem = data[host];
        result.push({
            hostname: rawSystem.hostname,
            project_title: rawSystem.title,
            principle_investigator: rawSystem.source, 
            active_allocations: rawSystem.allocations,
        })
      });
      return result;
    }, [data, hosts]);
    return { systems, ...query };
  };
  
  export default useActiveProjects;
