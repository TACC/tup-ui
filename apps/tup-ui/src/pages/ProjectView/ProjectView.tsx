import { PageLayout, RequireAuth } from '@tacc/tup-components';
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { UserList } from '@tacc/tup-components';

const ProjectView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  if (!projectId) return <div>No project selected.</div>;

  return (
    <RequireAuth>
      <PageLayout
        top={<div>header placeholder</div>}
        left={<UserList projectId={parseInt(projectId)} />}
        right={<Outlet />}
      ></PageLayout>
    </RequireAuth>
  );
};

export default ProjectView;
