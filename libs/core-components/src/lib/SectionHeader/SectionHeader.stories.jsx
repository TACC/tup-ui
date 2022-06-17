import SectionHeader from './SectionHeader';

export default {
  component: SectionHeader,
  title: 'SectionHeader',
};

const Template = (args) => <SectionHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
