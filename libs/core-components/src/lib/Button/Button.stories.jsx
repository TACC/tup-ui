import Button from './Button';

export default {
  component: Button,
};

export const Primary = {
  args: {
    type: 'primary',
    children: 'Primary Button'
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button'
  }
};

export const Large = {
  args: {
    size: 'large',
    children: 'Large Button'
  }
};

export const Small = {
  args: {
    size: 'small',
    children: 'Small Button'
  }
};
