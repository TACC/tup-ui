import React from 'react';
import { NavItem } from '@tacc/core-wrappers';
import styles from './SystemDetails.module.css';
import { useSystemMonitor } from '@tacc/tup-hooks';
import { InlineMessage, LoadingSpinner } from '@tacc/core-components';

export const SystemNavBar: React.FC = () => {
  const { data, error, isLoading } = useSystemMonitor();
  if (error)
    return (
      <div className={`nav-content ${styles['systems-listing-navbar']}`}>
        <InlineMessage type="warning">
          Unable to retrieve navigation bar.
        </InlineMessage>
      </div>
    );
  if (isLoading)
    return (
      <div className={`nav-content ${styles['systems-listing-navbar']}`}>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={`nav-content ${styles['systems-listing-navbar']}`}>
      {data &&
        data.map((system) => (
          <NavItem to={`/system_monitor/${system.tas_name}`}>
            <div>{system.display_name}</div>
          </NavItem>
        ))}
    </div>
  );
};
