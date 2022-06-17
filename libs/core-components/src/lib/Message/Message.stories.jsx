import Message from './Message';

export default {
  component: Message,
  title: 'Message',
};

const Template = (args) => <Message {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
