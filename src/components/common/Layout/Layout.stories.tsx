import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from '../../../app/store/store';
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
    <Provider store={store}>
      <HashRouter>
        <Layout>
          <div style={{ padding: '24px', background: '#f0f0f0', borderRadius: '8px' }}>Контент страницы</div>
        </Layout>
      </HashRouter>
    </Provider>
  ),
};
