import React from 'react';
import { Cell } from 'react-table';
import { ProjectsRawSystem } from '@tacc/tup-hooks';
import { formatDate } from '../utils/timeFormat';

export const DateExpires: React.FC<{ cell: Cell<ProjectsRawSystem, string> }> = ({
  cell: { value },
}) => <span>{ value.split(', ').map((e)=> `${formatDate(new Date(e))}`).join("\n") }</span> ;