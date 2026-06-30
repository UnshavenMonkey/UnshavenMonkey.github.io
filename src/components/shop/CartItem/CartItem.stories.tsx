import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'Shop/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  argTypes: {
    price: { control: 'number' },
    image: { control: 'text' },
    title: { control: 'text' },
    count: { control: { type: 'number', min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'wireless-headphones',
    price: 1990,
    image: 'https://placehold.co/64x64',
    title: 'Беспроводные наушники Pro',
    count: 2,
    onRemove: () => undefined,
  },
};
