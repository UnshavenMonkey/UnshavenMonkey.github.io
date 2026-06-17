import type { Meta, StoryObj } from '@storybook/react';
import { ProductShort } from './ProductShort';

const meta: Meta<typeof ProductShort> = {
  title: 'Shop/ProductShort',
  component: ProductShort,
  tags: ['autodocs'],
  argTypes: {
    price: { control: 'number' },
    image: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    count: { control: { type: 'number', min: 0 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'wireless-headphones',
    price: 1990,
    image: 'https://placehold.co/240x180',
    title: 'Беспроводные наушники',
    description: 'Наушники с шумоподавлением и временем работы до 30 часов.',
    count: 0,
    onAddToCart: () => undefined,
  },
};
