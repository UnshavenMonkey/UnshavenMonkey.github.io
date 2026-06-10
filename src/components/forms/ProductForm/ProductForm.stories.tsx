import type { Meta, StoryObj } from '@storybook/react';
import { ProductForm } from './ProductForm';

const meta: Meta<typeof ProductForm> = {
  title: 'Forms/ProductForm',
  component: ProductForm,
  tags: ['autodocs'],
  argTypes: {
    initialValues: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValues: {
      title: 'Wireless headphones',
      category: 'Electronics',
      price: '1990',
      image: 'https://placehold.co/360x360',
      description: 'Headphones with active noise cancellation and fast charging.',
    },
  },
};
