import { Story, Meta } from '@storybook/react';
import { LoadingSpinner } from './LoadingSpinner';

export default {
  component: LoadingSpinner,
  title: 'LoadingSpinner',
} as Meta;

const Template: Story = (args) => <LoadingSpinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
