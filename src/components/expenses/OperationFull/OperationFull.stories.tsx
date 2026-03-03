import type { Meta, StoryObj } from '@storybook/react';
import { OperationFull } from './OperationFull';

const meta: Meta<typeof OperationFull> = {
  title: 'Expenses/OperationFull',
  component: OperationFull,
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'number' },
    category: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    date: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expense: Story = {
  args: {
    amount: -2500,
    category: 'Продукты',
    title: 'Покупка в супермаркете',
    description:
      'Молоко, хлеб, яйца, масло, сыр и другие продукты питания на неделю. Потратил больше обычного из-за акции.',
    date: '15 января 2025',
  },
};

export const Income: Story = {
  args: {
    amount: 85000,
    category: 'Зарплата',
    title: 'Зарплата за январь',
    description:
      'Ежемесячная выплата от работодателя ООО "Рога и Копыта". Включает премию за выполнение квартального плана.',
    date: '31 января 2025',
  },
};
