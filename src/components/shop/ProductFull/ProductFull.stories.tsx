import type { Meta, StoryObj } from '@storybook/react';
import { ProductFull } from './ProductFull';

const meta: Meta<typeof ProductFull> = {
  title: 'Shop/ProductFull',
  component: ProductFull,
  tags: ['autodocs'],
  argTypes: {
    price: { control: 'number' },
    image: { control: 'text' },
    category: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 1990,
    image: 'https://placehold.co/360x360',
    category: 'Электроника',
    title: 'Беспроводные наушники Pro',
    description:
      'Наушники с активным шумоподавлением нового поколения. Время работы до 30 часов, быстрая зарядка за 15 минут обеспечивает 3 часа воспроизведения. Складная конструкция, мягкие амбушюры из экокожи.',
  },
};
