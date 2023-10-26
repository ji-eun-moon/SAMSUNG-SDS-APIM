import type { StorybookConfig } from '@storybook/nextjs';
import type { Configuration } from 'webpack';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport/register',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // 기존의 alias 설정 유지
    if (config.resolve && config.resolve.alias) {
      config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    }
    return config;
  },
};
export default config;
