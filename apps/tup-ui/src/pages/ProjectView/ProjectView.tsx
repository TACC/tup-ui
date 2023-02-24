import {
  PageLayout,
  RequireAuth,
  UserList,
  ProjectHeader,
} from '@tacc/tup-components';
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styles from './ProjectView.module.css';

const ProjectView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) return <div>No project selected.</div>;

  return (
    <RequireAuth>
      <section className={styles['project-view']}>
        <PageLayout
          top={<ProjectHeader projectId={parseInt(projectId)} />}
          left={<UserList projectId={parseInt(projectId)} />}
          right={
            <div>
              <Outlet />
            </div>
          }
        ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default ProjectView;
