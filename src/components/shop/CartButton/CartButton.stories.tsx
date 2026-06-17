import type { Meta, StoryObj } from '@storybook/react';
import { CartButton } from './CartButton';

const meta: Meta<typeof CartButton> = {
  title: 'Shop/CartButton',
  component: CartButton,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    count: 0,
    onAdd: () => undefined,
  },
};

export const WithItems: Story = {
  args: {
    count: 3,
    onAdd: () => undefined,
  },
};
