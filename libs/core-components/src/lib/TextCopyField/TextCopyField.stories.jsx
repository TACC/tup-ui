import TextCopyField from './TextCopyField';

export default {
  component: TextCopyField,
  title: 'TextCopyField',
};

const Template = (args) => <TextCopyField {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
