import type { Meta, StoryObj } from '@storybook/react';
import { OperationShort } from './OperationShort';

const meta: Meta<typeof OperationShort> = {
  title: 'Expenses/OperationShort',
  component: OperationShort,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'number' },
    category: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expense: Story = {
  args: {
    amount: -2500,
    category: 'Продукты',
    title: 'Покупка в супермаркете',
    description: 'Молоко, хлеб, яйца, масло, сыр и другие продукты питания на неделю',
  },
};

export const Income: Story = {
  args: {
    amount: 85000,
    category: 'Зарплата',
    title: 'Зарплата за январь',
    description: 'Ежемесячная выплата от работодателя ООО "Рога и Копыта"',
  },
};
