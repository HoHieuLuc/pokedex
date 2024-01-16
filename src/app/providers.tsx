'use client';

import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme/theme';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createIDBPersister, queryClient } from '@/lib';

interface Props {
  children: React.ReactNode;
}

const persister = createIDBPersister();

export default function Providers({ children }: Props) {
  const [client] = useState(() => queryClient);

  return (
    <PersistQueryClientProvider
      client={client}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 * 30 }}
    >
      <MantineProvider theme={theme}>{children}</MantineProvider>
      <ReactQueryDevtools buttonPosition='bottom-left' />
    </PersistQueryClientProvider>
  );
}
