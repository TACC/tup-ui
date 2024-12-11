import type { Meta, StoryObj } from '@storybook/react';

import Button, { SIZE_MAP } from './Button';

import styles from './Button.stories.module.css';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    size: {
      options: Object.keys(SIZE_MAP),
      control: { type: 'inline-radio' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Types: Story = {
  render: (args) => {
    const { size, ...argsSansSize } = args;

    return (
      <>
        <Button type="primary" {...args}>
          Primary
        </Button>
        <Button type="secondary" {...args}>
          Secondary
        </Button>
        <Button type="tertiary" {...args}>
          Tertiary
        </Button>
        <Button type="link" {...argsSansSize}>
          as Link
        </Button>
      </>
    );
  },
  args: {
    className: styles['button'] + ' ',
  },
};
