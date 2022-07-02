import DropdownSelector from './DropdownSelector';

export default {
  component: DropdownSelector,
  title: 'DropdownSelector',
};

const Template = (args) => <DropdownSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
