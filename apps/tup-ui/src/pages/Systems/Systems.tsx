import React from 'react';
import { PageLayout, RequireAuth, SystemNavBar, SystemDetails, SystemStatusHeader } from '@tacc/tup-components';
import { useParams } from 'react-router-dom';

const Layout: React.FC = () => {
  // To get the System name for the Page Header
  const { tas_name } = useParams<{ tas_name: string }>();
  return (
    <RequireAuth>
        <PageLayout
          top={ <SystemStatusHeader tas_name={tas_name}/>
          }
          left={<SystemNavBar tas_name={tas_name}/>}
          right={<SystemDetails tas_name={tas_name} />}
        ></PageLayout>
    </RequireAuth>
  );
};

export default Layout;
