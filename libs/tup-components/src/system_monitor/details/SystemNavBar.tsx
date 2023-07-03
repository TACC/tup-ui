import React from 'react';
import { QueryNavItem } from '@tacc/core-wrappers';
import { useLocation } from 'react-router-dom';
import styles from './SystemDetails.module.css';
import { useSystemMonitor } from '@tacc/tup-hooks';
import { InlineMessage, LoadingSpinner } from '@tacc/core-components';

export const SystemNavBar: React.FC = () => {
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  //To get the second part of pathname to isolate tas_name else set to null
  const tasName = pathArray.length > 2 ? pathArray[pathArray.length - 1] : null;
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

  // To set Frontera as active in navbar if no system selected
  const defaultTasName = 'frontera';
  return (
    <div className={`nav-content ${styles['systems-listing-navbar']}`}>
      {data &&
        data.map((system) => (
          <QueryNavItem
            to={`/system_monitor/${system.tas_name}`}
            key={`${system.tas_name}`}
            // To set Frontera as active in navbar if no system selected.
            active={
              !tasName
                ? system.tas_name === defaultTasName
                : system.tas_name === tasName
            }
          >
            {system.display_name}
          </QueryNavItem>
        ))}
    </div>
  );
};
