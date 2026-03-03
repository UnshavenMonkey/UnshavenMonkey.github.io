import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {
    visible: true,
  },
  render: (args) => (
    <Modal {...args}>
      <h3 style={{ margin: '0 0 8px' }}>Заголовок модального окна</h3>
      <p style={{ margin: 0, color: '#555' }}>Содержимое модального окна. Здесь может быть любой контент.</p>
    </Modal>
  ),
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
  render: (args) => (
    <Modal {...args}>
      <p>Этот контент не виден</p>
    </Modal>
  ),
};
