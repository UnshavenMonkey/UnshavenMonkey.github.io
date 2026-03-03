import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const ModalDemoComponent = () => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст для модального окна..."
        style={{ padding: '8px 12px', fontSize: 14, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <button type="button" onClick={() => setVisible(true)} style={{ padding: '8px 16px' }}>
        Открыть модальное окно
      </button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <h3 style={{ margin: '0 0 12px' }}>Содержимое окна</h3>
        <p style={{ margin: 0 }}>{text || '(текст не введён)'}</p>
      </Modal>
    </div>
  );
};

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

export const WithInput: Story = {
  render: () => <ModalDemoComponent />,
};
