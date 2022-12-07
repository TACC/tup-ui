import { Section } from '@tacc/core-components';
import { PageLayout } from '@tacc/tup-components';
import React from 'react';

const ProjectDetail: React.FC = () => {
  return <Section header="Project Detail" content={<PageLayout />}></Section>;
};

export default ProjectDetail;
