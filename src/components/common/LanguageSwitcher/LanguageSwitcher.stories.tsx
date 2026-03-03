import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LanguageProvider } from '../../../providers/LanguageProvider/LanguageProvider';

const LanguageDemo = () => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <LanguageSwitcher />
      <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{t('demo.greeting')}</p>
      <p style={{ margin: 0, color: '#666' }}>{t('demo.description')}</p>
    </div>
  );
};

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Common/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDemo: Story = {
  render: () => (
    <LanguageProvider>
      <LanguageDemo />
    </LanguageProvider>
  ),
};
