import SectionMessage from './SectionMessage';

export default {
  component: SectionMessage,
  title: 'SectionMessage',
};

const Template = (args) => <SectionMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
