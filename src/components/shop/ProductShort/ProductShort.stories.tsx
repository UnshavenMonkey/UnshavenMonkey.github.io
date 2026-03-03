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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 1990,
    image: 'https://placehold.co/240x180',
    title: 'Беспроводные наушники',
    description: 'Наушники с шумоподавлением и временем работы до 30 часов, складная конструкция',
  },
};
