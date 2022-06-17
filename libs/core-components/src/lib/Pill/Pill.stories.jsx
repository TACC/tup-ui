import Pill from './Pill';

export default {
  component: Pill,
  title: 'Pill',
};

const Template = (args) => <Pill {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
