import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import Providers from './providers';

export const metadata = {
  title: 'Pokedex',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.svg' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
