import Section from './Section';

export default {
  component: Section,
  title: 'Section',
};

const Template = (args) => <Section {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
