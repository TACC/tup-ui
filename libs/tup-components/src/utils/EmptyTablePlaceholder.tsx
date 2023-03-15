import { SectionMessage } from '@tacc/core-components';
import styles from './Utils.module.css';
import React from 'react';

interface EmptyPlaceholderProps {
  componentName: string;
}

export const EmptyTablePlaceholder: React.FC<EmptyPlaceholderProps> = ({
  componentName,
}) => {
  const getEmptyText = (componentName: string) => {
    switch (componentName) {
      case 'Projects':
        return (
          <>
            No projects or allocations found.
            <a
              href="https://submit-tacc.xras.org/"
              target="_blank"
              rel="noreferrer"
            >
              Create a new project on TXRAS{' '}
            </a>
          </>
        );
      case 'Tickets':
        return 'You have not added any tickets';
      default:
        return 'No data found.';
    }
  };
  return (
    <div className={styles['empty']}>
      <SectionMessage type="warning">
        {getEmptyText(componentName)}
      </SectionMessage>
    </div>
  );
};

export default EmptyTablePlaceholder;
