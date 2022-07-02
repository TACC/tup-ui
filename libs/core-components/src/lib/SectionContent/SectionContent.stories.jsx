import SectionContent from './SectionContent';

export default {
  component: SectionContent,
  title: 'SectionContent',
};

const Template = (args) => <SectionContent {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
