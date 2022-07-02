import { Story, Meta } from '@storybook/react';
import { Icon } from './Icon';

export default {
  component: Icon,
  title: 'Icon',
} as Meta;

const Template: Story = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
