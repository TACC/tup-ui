import { Story, Meta } from '@storybook/react';
import { CoreComponents, CoreComponentsProps } from './core-components';

export default {
  component: CoreComponents,
  title: 'CoreComponents',
} as Meta;

const Template: Story<CoreComponentsProps> = (args) => (
  <CoreComponents {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
