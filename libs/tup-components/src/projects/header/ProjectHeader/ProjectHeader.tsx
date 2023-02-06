import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProjects, useProjectScienceField } from '@tacc/tup-hooks';
import styles from './Projects.module.css';
import {
  DescriptionList,
  InlineMessage,
  LoadingSpinner,
} from '@tacc/core-components';
import { ProjectEditModal } from '../../details/ProjectEdit';

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
  const unixGroup = dataById?.gid ? `G-${dataById?.gid}`.slice() : `None`;
  const usageData = dataById?.allocations?.find((allocations) => allocations);
  const percentageCompute = usageData
    ? (usageData?.used / usageData?.total) * 100
    : '--';
  const percentageStorage = usageData
    ? (usageData?.storageUsed / usageData?.storageQuota) * 100
    : '--';
  const usageArray = {
    Compute: `${usageData?.total ? usageData?.total : '0'} SUs (${
      percentageCompute ? percentageCompute : '0'
    }% Used)   `,
    Storage: `${usageData?.storageQuota ? usageData?.storageQuota : '0'} GBs (${
      percentageStorage ? percentageStorage : '0'
    }% Used) `,
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
