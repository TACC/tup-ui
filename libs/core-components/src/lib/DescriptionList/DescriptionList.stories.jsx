import DescriptionList from './DescriptionList';

export default {
  component: DescriptionList,
  title: 'DescriptionList',
};

const Template = (args) => <DescriptionList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
