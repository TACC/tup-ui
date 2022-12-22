import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '@tacc/tup-hooks';
import { InlineMessage, LoadingSpinner } from '@tacc/core-components';

export const ProjectHeader: React.FC<{ projectId: number }> = ({
  projectId,
}) => {
  const { data, isLoading, error } = useProjects();
  const dataById = data?.find((project) => project.id === projectId);
  const usageData = dataById?.allocations?.find((allocations) => allocations);
  const percentageCompute = usageData
    ? (usageData?.used / usageData?.total) * 100
    : '--';
  const percentageStorage = usageData
    ? (usageData?.storageUsed / usageData?.storageQuota) * 100
    : '--';
  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <InlineMessage type="warning">
        Unable to retrieve project information.
      </InlineMessage>
    );

  return (
    <>
      <Link to={'/projects/active/'}>Active Projects </Link>
      {`/ ${dataById?.title}`}
      <div>
        {`Project Charge Code: ${dataById?.chargeCode} Field of Science: placeholder`}
      </div>
      {`Unix Group: placeholder Compute: ${usageData?.total} (${
        percentageCompute ? percentageCompute : '0'
      }% Used) Storage: ${usageData?.storageQuota} (${
        percentageStorage ? percentageStorage : '0'
      }% Used) `}
    </>
  );
};

export default ProjectHeader;
