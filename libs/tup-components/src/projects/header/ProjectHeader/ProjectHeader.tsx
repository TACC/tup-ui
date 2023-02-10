import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProjects, useProjectScienceField } from '@tacc/tup-hooks';
import styles from './Projects.module.css';
import {
  DescriptionList,
  InlineMessage,
  LoadingSpinner,
} from '@tacc/core-components';

const getPercentUsage = (total: number, used: number): string => {
  const percentage = (used / total) * 100;
  switch (true) {
    case percentage === 0:
      return '0%';
    case percentage < 1:
      return '<1%';
    case isNaN(percentage):
      return '0%';
    default:
      return `${Math.floor(percentage)}%`;
  }
};

export const ProjectHeader: React.FC<{ projectId: number }> = ({
  projectId,
}) => {
  const params = useParams<{ projectId: string; username: string }>();

  const { data, isLoading, error } = useProjects();
  const fieldData = useProjectScienceField();
  const dataById = data?.find((project) => project.id === projectId);
  const isActive = dataById?.allocations?.some(
    (alloc) => alloc.status === 'Active'
  );

  const fieldOfScienceID = fieldData?.data?.find(
    (field) => field.id === dataById?.fieldId
  );
  const fieldOfScience = fieldOfScienceID?.name
    ? fieldOfScienceID?.name
    : 'None';
  const unixGroup = dataById?.gid ? `G-${dataById?.gid}` : `None`;
  const activeAllocations =
    dataById?.allocations?.filter((alloc) => alloc.status === 'Active') ?? [];

  const totalCompute = activeAllocations.reduce(
    (prev, curr) => prev + curr.total,
    0
  );
  const totalStorage = activeAllocations.reduce(
    (prev, curr) => prev + curr.storageQuota,
    0
  );
  const usedCompute = activeAllocations.reduce(
    (prev, curr) => prev + curr.used,
    0
  );
  const usedStorage = activeAllocations.reduce(
    (prev, curr) => prev + curr.storageUsed,
    0
  );

  const percentageCompute = getPercentUsage(totalCompute, usedCompute);
  const percentageStorage = getPercentUsage(totalStorage, usedStorage);

  const usageArray = {
    Compute: `${totalCompute} SUs (${percentageCompute} Used)   `,
    Storage: `${totalStorage} GBs (${percentageStorage} Used) `,
  };

  if (isLoading || fieldData.isLoading)
    return (
      <div className={styles['loading-placeholder']}>
        <LoadingSpinner />
      </div>
    );

  if (error || fieldData.error)
    return (
      <InlineMessage type="warning">
        Unable to retrieve project information.
      </InlineMessage>
    );

  return (
    <>
      <h3 className={styles['title']}>
        {isActive && <Link to={'/projects?show=active'}>Active Projects </Link>}
        {!isActive && (
          <Link to={'/projects?show=inactive'}>Inactive Projects </Link>
        )}
        {!params.username && `/ ${dataById?.title}`}
        {params.username && (
          <>
            <Link to={`/projects/${projectId}`}>{`/ ${dataById?.title}`} </Link>
            {`/ ${params.username}`}{' '}
          </>
        )}
      </h3>
      <div className={styles['separator']}></div>
      <dl className={styles['group']}>
        <dl className={styles['project-heading']}>
          <div>
            <dt className={styles['key']}>Project Charge Code</dt>
            <dd className={styles['value']}> {dataById?.chargeCode}</dd>
          </div>
          <div>
            <dt className={styles['key']}>Unix Group</dt>
            <dd className={styles['value']}>{`${unixGroup}`}</dd>
          </div>
        </dl>{' '}
        <dl className={styles['project-heading']}>
          <div>
            <dt className={styles['key']}>Field of Science</dt>
            <dd className={styles['value']}>{`${fieldOfScience}`}</dd>
          </div>
          <DescriptionList
            className={styles['usage']}
            direction="horizontal"
            data={usageArray}
          ></DescriptionList>
        </dl>
      </dl>
      <div className={styles['separator-bottom']}></div>
    </>
  );
};

export default ProjectHeader;
