import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../src/styles/globals.scss';

const customViewports = {
  samsungNotebook: {
    name: 'samsung notebook',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
};
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...customViewports,
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      }, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'samsung notebook',
    },
  },
};

export default preview;
