import { SectionMessage } from '@tacc/core-components';
import styles from './EmptyTablePlaceholder.module.css';
import React from 'react';

interface EmptyPlaceholderProps {
  children: React.ReactNode;
}

export const EmptyTablePlaceholder: React.FC<EmptyPlaceholderProps> = ({
  children,
}) => {
  return (
    <div className={styles['empty']}>
      <SectionMessage type="warning">{children}</SectionMessage>
    </div>
  );
};

export default EmptyTablePlaceholder;
