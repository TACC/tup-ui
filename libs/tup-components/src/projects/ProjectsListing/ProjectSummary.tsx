import { ProjectsRawSystem } from '@tacc/tup-hooks';
import { Link } from 'react-router-dom';
import styles from './ProjectsListing.module.css';

export const ProjectSummary: React.FC<{
  project: ProjectsRawSystem;
}> = ({ project }) => {
  const totalStorageRequested =
    project.allocations?.reduce((acc, e) => acc + e.storageRequested, 0) ?? 0;
  const totalStorageUsed =
    project.allocations?.reduce((acc, e) => acc + e.storageUsed, 0) ?? 0;
  const totalComputeRequested =
    project.allocations?.reduce((acc, e) => acc + e.computeRequested, 0) ?? 0;
  const totalComputeUsed =
    project.allocations?.reduce((acc, e) => acc + e.used, 0) ?? 0;

  return (
    <div>
      <Link to={`/projects/${project.id}`}>
        <span className={styles['project-title']}>{project.title}</span>
      </Link>
      <div>
        {'Project Charge Code: '} {project.chargeCode}
      </div>
      <div className={styles['project-pi']}>
        {'Principal Investigator: ' +
          project.pi.firstName +
          ' ' +
          project.pi.lastName}
      </div>
      <div className={styles['project-summary-separator']} />
      <div>
        <span>{`Compute: ${
          totalComputeRequested ? totalComputeRequested : '--'
        } SUs `}</span>
        <span>
          {totalComputeUsed
            ? ' (' +
              ((totalComputeUsed / totalComputeRequested) * 100).toFixed(0) +
              '  % Used) '
            : ' (0% Used) '}
        </span>
        <span className={styles['compute-separator']}>|</span>
        <span>
          {`Storage: ${
            totalStorageRequested ? totalStorageRequested : '--'
          } GBs `}
        </span>
        <span>
          {totalStorageUsed
            ? ' (' +
              ((totalStorageUsed / totalStorageRequested) * 100).toFixed(0) +
              '  % Used) '
            : ' (0% Used) '}
        </span>
      </div>
    </div>
  );
};
