'use client';

import '@mantine/core/styles.css';
import { DEFAULT_THEME, createTheme } from '@mantine/core';
import { pixelifySans } from './fonts';

export const theme = createTheme({
  fontFamily: pixelifySans.style.fontFamily,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: `${pixelifySans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },
});
