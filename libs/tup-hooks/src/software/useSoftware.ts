import { UseQueryResult } from '@tanstack/react-query';
import { SoftwareResult, SoftwareDetail } from '.';
import { useGet } from '../requests';

export const useSoftware = (): UseQueryResult<SoftwareResult[]> => {
  const query = useGet<SoftwareResult[]>({
    endpoint: `/software`,
    key: ['software'],
  });
  return query;
};

export const useSoftwareDetail = (
  pkg: string,
  enabled: boolean
): UseQueryResult<SoftwareDetail> => {
  const query = useGet<SoftwareDetail>({
    endpoint: `/software/detail?package=${pkg}`,
    key: ['softwareDetail', pkg],
    options: {
      enabled,
    },
  });
  return query;
};
