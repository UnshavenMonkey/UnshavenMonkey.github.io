import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Common/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Layout>
      <div style={{ padding: '24px', background: '#f0f0f0', borderRadius: '8px' }}>Контент страницы</div>
    </Layout>
  ),
};
