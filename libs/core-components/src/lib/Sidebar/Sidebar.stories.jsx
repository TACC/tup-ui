import Sidebar from './Sidebar';

export default {
  component: Sidebar,
  title: 'Sidebar',
};

const Template = (args) => <Sidebar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
