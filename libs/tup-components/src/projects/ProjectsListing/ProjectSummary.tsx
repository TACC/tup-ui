import { ProjectsRawSystem } from '@tacc/tup-hooks';
import { Link } from 'react-router-dom';
import styles from './ProjectsListing.module.css';

export const ProjectSummary: React.FC<{
  project: ProjectsRawSystem;
}> = ({ project }) => {
  const allocations = (project.allocations ?? []).filter(
    (a) => a.status === 'Active'
  );
  const totalStorageRequested =
    allocations?.reduce((acc, e) => acc + e.storageQuota, 0) ?? 0;
  const totalStorageUsed =
    allocations?.reduce((acc, e) => acc + e.storageUsed, 0) ?? 0;
  const totalComputeRequested =
    allocations?.reduce((acc, e) => acc + e.total, 0) ?? 0;
  const totalComputeUsed =
    allocations?.reduce((acc, e) => acc + e.used, 0) ?? 0;

  return (
    <>
      <Link to={`/projects/${project.id}`} className={styles['project-title']}>
        {project.title ?? '(untitled)'}
      </Link>
      <div>
        {'Project Charge Code: '} <strong>{project.chargeCode}</strong>
      </div>
      <div className={styles['project-pi']}>
        {'Principal Investigator: ' +
          project.pi.firstName +
          ' ' +
          project.pi.lastName}
      </div>
      <hr />
      <div>
        <span>
          Compute:{' '}
          <strong>{`${
            totalComputeRequested ? totalComputeRequested : '--'
          } SUs `}</strong>
        </span>
        <span>
          {totalComputeUsed
            ? ' (' +
              Math.floor(
                (totalComputeUsed / totalComputeRequested) * 100
              ).toFixed(0) +
              '% Used) '
            : ' (0% Used) '}
        </span>
        <span className={styles['compute-separator']}>|</span>
        <span>
          Storage:{' '}
          <strong>{`${
            totalStorageRequested ? totalStorageRequested : '--'
          } GBs `}</strong>
        </span>
        <span>
          {totalStorageUsed
            ? ' (' +
              ((totalStorageUsed / totalStorageRequested) * 100).toFixed(0) +
              '  % Used) '
            : ' (0% Used) '}
        </span>
      </div>
    </>
  );
};
