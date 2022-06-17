import InlineMessage from './InlineMessage';

export default {
  component: InlineMessage,
  title: 'InlineMessage',
};

const Template = (args) => <InlineMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
