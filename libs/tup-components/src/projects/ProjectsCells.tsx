import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { ProjectsRawSystem } from '@tacc/tup-hooks';
import { Pill, SectionTableWrapper } from '@tacc/core-components';

export const ProjectTitle: React.FC<{
  cell: Cell<ProjectsRawSystem, string>;
}> = ({ cell: { value, row } }) => (
  <Link to={`/projects/${row.original.id}`}>{value}</Link>
);

export const PrinInv: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <div>{value}</div>;

/*Refactor ProjectSummary Cell to have Storage and Compute in their own export const StorageAllocations: React.FC<{
  cell: Cell<ProjectsRawSystem>;
}> = ({ cell: { value, row } }) => (<SectionTableWrapper content={row.original.id}>{value}{'Compute: ' + row.original.allocations?.reduce((acc, e) => acc + e.computeRequested, 0) + ' SUs'},
{'Storage: ' + row.original.allocations?.reduce((acc, e) => acc + e.storageRequested, 0) + ' SUs'}
</SectionTableWrapper>);*/

export const ProjectSummary: React.FC<{
  cell: Cell<ProjectsRawSystem>;
}> = ({ cell: { value, row } }) => (
  <>
    <Link to={`/projects/${row.original.id}`}>{value}</Link>
      <div>{'Project Charge Code: '} {row.original.chargeCode}</div>
      <Pill type='success'>{"Principle Investigator: " + row.original.pi.firstName + ' ' + row.original.pi.lastName}
      </Pill>
    <SectionTableWrapper>
      <td colSpan={2 }>{'Compute: '} 
        <b>{row.original.allocations?.reduce((acc, e) => acc + e.computeRequested, 0) + ' SUs'}</b>
        {" ( % Used)"}</td>
      <td>{'Storage: '} 
        <b>{row.original.allocations?.reduce((acc, e) => acc + e.storageRequested, 0) + ' SUs'}</b>
        {" ( % Used)"}</td>
    </SectionTableWrapper>
    </>  
);

