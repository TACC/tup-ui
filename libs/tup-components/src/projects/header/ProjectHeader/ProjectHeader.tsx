import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects, useProjectScienceField } from '@tacc/tup-hooks';
import styles from './Projects.module.css';
import {
  DescriptionList,
  InlineMessage,
  LoadingSpinner,
} from '@tacc/core-components';

export const ProjectHeader: React.FC<{ projectId: number }> = ({
  projectId,
}) => {
  const { data, isLoading, error } = useProjects();
  const fieldData = useProjectScienceField();
  const dataById = data?.find((project) => project.id === projectId);

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
        <Link to={'/projects/active/'}>Active Projects </Link>
        {`/ ${dataById?.title}`}
      </h3>
      <div className={styles['separator']}></div>
      <dl className={styles['group']}>
        <dl className={styles['project-heading']}>
          <dt className={styles['key']}>Project Charge Code</dt>
          <dd className={styles['value']}> {dataById?.chargeCode}</dd>
          <dt className={styles['key']}>Field of Science</dt>
          <dd className={styles['value']}>{`${fieldOfScience}`}</dd>
        </dl>{' '}
        <dl className={styles['project-heading']}>
          <dt className={styles['key']}>Unix Group</dt>
          <dd className={styles['value']}>{`${unixGroup}`}</dd>

          <DescriptionList
            direction="horizontal"
            data={usageArray}
          ></DescriptionList>
        </dl>
      </dl>
    </>
  );
};

export default ProjectHeader;
