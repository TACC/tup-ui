import React from 'react';
import { QueryNavItem } from '@tacc/core-wrappers';
import { useSystemMonitor } from '@tacc/tup-hooks';
import { InlineMessage, LoadingSpinner } from '@tacc/core-components';
import { SystemDetailProps } from '..';

export const SystemNavBar: React.FC<SystemDetailProps> = ({
  // To set default prop for system if none selected
  tas_name = 'frontera',
}) => {
  const { data, error, isLoading } = useSystemMonitor();
  if (error)
    return (
      <div className={`nav-content`}>
        <InlineMessage type="warning">
          Unable to retrieve navigation bar.
        </InlineMessage>
      </div>
    );
  if (isLoading)
    return (
      <div className={`nav-content`}>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className={`nav-content`}>
      {data &&
        data.map((system) => (
          <QueryNavItem
            to={`/system-status/${system.tas_name}`}
            key={`${system.tas_name}`}
            // To set default system as active in navbar if no system selected.
            active={tas_name === `${system.tas_name}`}
          >
            {system.display_name}
          </QueryNavItem>
        ))}
    </div>
  );
};
