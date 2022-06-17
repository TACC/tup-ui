import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

const Template = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
