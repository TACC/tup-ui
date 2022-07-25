import React from 'react';
import { Sidebar, HistoryBadge } from '@tacc/core-components';

function UIPatternsSidebar() {
  const sidebarItems = [
    {
      to: 'history',
      iconName: 'trash',
      label: 'History',
      children: <HistoryBadge unread={2} disabled={false} />,
    },
    { to: 'allocations', iconName: 'alert', label: 'Allocations' },
    {
      to: 'applications',
      iconName: 'alert',
      label: 'Disabled',
      disabled: true,
    },
    { to: 'ui-patterns', iconName: 'file', label: 'Here' },
  ];
  return (
    <dl>
      <dd>
        <Sidebar sidebarItems={sidebarItems} />
      </dd>
    </dl>
  );
}

export default UIPatternsSidebar;
