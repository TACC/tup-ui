import { PageLayout, RequireAuth, UserList, ProjectHeader  } from '@tacc/tup-components';
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ProjectView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) return <div>No project selected.</div>;

  return (
    <RequireAuth>
      <PageLayout
        top={<ProjectHeader projectId={parseInt(projectId)} />}
        left={<UserList projectId={parseInt(projectId)} />}
        right={<Outlet />}
      ></PageLayout>
    </RequireAuth>
  );
};

export default ProjectView;
