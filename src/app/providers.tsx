'use client';

import { useState } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import queryClient from '@/lib/query-client';
import { createIDBPersister } from '@/lib/query-client-persister';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme';

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
    </PersistQueryClientProvider>
  );
}
