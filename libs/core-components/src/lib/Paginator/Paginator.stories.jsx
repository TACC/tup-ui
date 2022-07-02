import Paginator from './Paginator';

export default {
  component: Paginator,
  title: 'Paginator',
};

const Template = (args) => <Paginator {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
