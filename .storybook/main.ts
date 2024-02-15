import type { StorybookConfig } from '@storybook/preact-vite';
import { uniqBy } from 'remeda';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/preact-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    const plugins = config.plugins
      ?.flat(1)
      ?.filter((p: any) => p?.name !== 'vite:preact-jsx');
    const uniquePlugins = plugins
      ? uniqBy(plugins, (p: any) => p.name)
      : undefined;
    return {
      ...config,
      plugins: uniquePlugins,
    };
  },
};
export default config;
