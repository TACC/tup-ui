import { SystemDetails } from '@tacc/tup-components';
import React from 'react';
import { useParams } from 'react-router-dom';

const SystemDetail: React.FC = () => {
  const { tas_name } = useParams<{ tas_name: string }>();
  if (!tas_name) {
    return <SystemDetails tas_name={'frontera'} />;
  }
  return <SystemDetails tas_name={tas_name} />;
};

export default SystemDetail;
