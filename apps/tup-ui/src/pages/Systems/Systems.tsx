import React from 'react';
import { PageLayout, RequireAuth, SystemNavBar } from '@tacc/tup-components';
import { SystemDetail } from '..';
import { SectionHeader } from '@tacc/core-components';
import styles from './Systems.module.css';
import { useParams } from 'react-router-dom';
import { useSystemQueue } from '@tacc/tup-hooks';

const Layout: React.FC = () => {
  // To get the System name for the Page Header
  let { tas_name } = useParams<{ tas_name: string }>();
  if (!tas_name) {
    tas_name = 'frontera';
  }
  const { data: systemData } = useSystemQueue(tas_name);
  return (
    <RequireAuth>
      <section className={styles['system-section']}>
        <PageLayout
          top={
            <SectionHeader>
              System Status / {systemData?.display_name}{' '}
            </SectionHeader>
          }
          left={<SystemNavBar />}
          right={<SystemDetail />}
        ></PageLayout>
      </section>
    </RequireAuth>
  );
};

export default Layout;
