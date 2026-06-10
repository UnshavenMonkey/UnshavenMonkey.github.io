import type { Meta, StoryObj } from '@storybook/react';
import { AuthForm } from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Forms/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  argTypes: {
    initialMode: {
      control: 'radio',
      options: ['login', 'register'],
    },
    initialValues: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    initialMode: 'login',
    initialValues: {
      email: 'jane@example.com',
      password: 'Password123',
      name: '',
      confirmPassword: '',
    },
  },
};

export const Register: Story = {
  args: {
    initialMode: 'register',
    initialValues: {
      email: 'jane@example.com',
      password: 'Password123',
      name: 'Jane Cooper',
      confirmPassword: 'Password123',
    },
  },
};
