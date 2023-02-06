import { useQuery, UseQueryResult } from '@tanstack/react-query';
import useConfig from '../useConfig';
import useJwt from '../auth/useJwt';
import useProjects from './useProjects';
import axios from 'axios';
import { ProjectsAllocations, AllocationUsage, UsagePerResource } from '.';

const useProjectUsage = (
  projectId: number
): UseQueryResult<AllocationUsage[], Error> => {
  const { baseUrl } = useConfig();
  const { jwt } = useJwt();
  const { data } = useProjects();
  const getUtil = async (projectId: number, allocationId: number) => {
    const request = await axios.get<AllocationUsage>(
      `${baseUrl}/projects/${projectId}/allocations/${allocationId}/usage`,
      {
        headers: { 'x-tup-token': jwt ?? '' },
      }
    );
    return request.data;
  };

  const allocations: ProjectsAllocations[] =
    (data ?? [])
      .find((project) => project.id === projectId)
      ?.allocations?.filter((a) => a.status === 'Active') ?? [];

  const usage_req = async () =>
    axios.all(
      allocations.map((allocation) => getUtil(projectId, allocation.id))
    );

  return useQuery({
    queryKey: ['usage', projectId],
    queryFn: usage_req,
    enabled: !!data,
    refetchOnMount: false,
  });
};

const useProjectUsageForUser = (projectId: number, username: string) => {
  const { data: projectData } = useProjects();
  const allocations: ProjectsAllocations[] =
    (projectData ?? [])
      .find((project) => project.id === projectId)
      ?.allocations?.filter((a) => a.status === 'Active') ?? [];

  const { data: usageData, ...rest } = useProjectUsage(projectId);
  if (!usageData) return { data: usageData, ...rest };

  //Keep a hash map of resource IDs for deduplication.
  const usageHash: Record<string, UsagePerResource> = {};

  usageHash &&
    allocations.forEach((allocation) => {
      const usage = usageData?.find((u) => u.allocationId === allocation.id);
      const usageByUser =
        usage?.usage.find((u) => u.username === username)?.usage ?? 0;
      usageHash[allocation.resource] = usageHash[allocation.resource]
        ? {
            resource: allocation.resource,
            total: usageHash[allocation.resource].total + allocation.total,
            used: usageHash[allocation.resource].used + usageByUser,
          }
        : {
            resource: allocation.resource,
            total: allocation.total,
            used: usageByUser,
          };
    });

  const usageMap = usageHash && Object.keys(usageHash).map((k) => usageHash[k]);
  return { data: usageMap, ...rest };
};

export default useProjectUsageForUser;
