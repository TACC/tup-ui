import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { ProjectsRawSystem } from '@tacc/tup-hooks';
import { Pill, SectionTableWrapper } from '@tacc/core-components';
import { valuesIn } from 'lodash';

export const ProjectTitle: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value, row } }) => (
  <Link to={`/projects/${row.original.id}`}>{value}</Link>
);

export const PrinInv: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <div>{value}</div>;


export const ProjectSummaryAll: React.FC<{
  cell: Cell<ProjectsRawSystem>;
}> = ({ cell: { value, row } }) => (
  <>
    <Link to={`/projects/${row.original.id}`}>{value}</Link>
      <div>{'Project Charge Code: '} {row.original.chargeCode}</div>
      <Pill type='success'>{"Principle Investigator: " + row.original.pi.firstName + ' ' + row.original.pi.lastName}
      </Pill><p/>
    <SectionTableWrapper>
      <td colSpan={2 }>{'Compute: '} 
        <b>{row.original.allocations?.reduce((acc, e) => acc + e.computeRequested, 0) + ' SUs'}</b>
        {" (" + row.original.allocations?.reduce((acc, e) => (((acc + e.used) /(acc+ e.computeRequested)) * 100), 0).toFixed(0) + "  % Used)"}</td>
      <td>{'Storage: '} 
        <b>{row.original.allocations?.reduce((acc, e) => acc + e.storageRequested, 0) + ' GBs'}</b>
        {" (" + row.original.allocations?.reduce((acc, e) => (((acc + e.storageUsed) /(acc+ e.storageRequested)) * 100), 0).toFixed(0) + "  % Used)"}</td>
        {"used" + row.original.allocations?.reduce((acc, e) => acc + e.storageUsed , 0)};
        {"requested" + row.original.allocations?.reduce((acc, e) => acc + e.storageRequested , 0)};
        {"percent" +row.original.allocations?.reduce((acc, e) => ((acc + e.storageUsed) / (acc+ e.storageRequested)) * 100, 0) }
    </SectionTableWrapper>
    </>  
);

