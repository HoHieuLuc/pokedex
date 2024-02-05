'use client';

import { GameButton, Navbar } from '@/app/fire-red/_components';
import { triggerGameHotkey, useGameHotkeys } from '@/hooks';
import { Flex } from '@mantine/core';
import { useSearchParams } from 'next/navigation';

export const BottomNav = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const hotkeys = useGameHotkeys({});

  return (
    <Navbar align='center' justify='space-between'>
      <GameButton
        label='cry'
        icon={<GameButton.Icon label='start' />}
        onClick={() => triggerGameHotkey({ key: hotkeys.Start })}
        title={`Press ${hotkeys.Start} button`}
      />
      <Flex>
        <GameButton
          label={tab === 'area' ? 'cancel' : 'next data'}
          icon={<GameButton.Icon label='A' />}
          onClick={() => triggerGameHotkey({ key: hotkeys.A })}
          title={`Press ${hotkeys.A} button`}
        />
        <GameButton
          label={tab === 'area' ? 'previous data' : 'cancel'}
          icon={<GameButton.Icon label='B' />}
          onClick={() => triggerGameHotkey({ key: hotkeys.B })}
          title={`Press ${hotkeys.B} button`}
        />
      </Flex>
    </Navbar>
  );
};

export const BottomNavFallback = () => {
  return <Navbar align='center' justify='space-between'></Navbar>;
};
