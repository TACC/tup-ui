import React from 'react';
import { MfaView } from '@tacc/tup-components';
import styles from './Mfa.module.css';
import { divide } from 'lodash';

export default () => {
  return (
    <div className={styles['mfa-layout']}>
      <MfaView />
    </div>
  );
};
