import React from 'react';
import {
  PageLayout,
  RequireAuth,
  SystemNavBar,
  SystemDetails,
  SystemStatusHeader,
} from '@tacc/tup-components';
import { useParams } from 'react-router-dom';
import styles from './Systems.module.css';

const Layout: React.FC = () => {
  // To get the System name for the Page Header
  const { tas_name } = useParams<{ tas_name: string }>();
  return (
    <RequireAuth>
      <section className={styles['system-section']}>
      <PageLayout
        top={<SystemStatusHeader tas_name={tas_name} />}
        left={<SystemNavBar tas_name={tas_name} />}
        right={<SystemDetails tas_name={tas_name} />}
      ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default Layout;
