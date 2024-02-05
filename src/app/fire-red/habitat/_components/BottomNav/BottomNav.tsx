'use client';

import { GameButton, Navbar } from '@/app/fire-red/_components';
import { triggerGameHotkey, useGameHotkeys } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import { BottomNav as PBottomNav } from '@/app/fire-red/pokemon/_components';

export const BottomNav = () => {
  const searchParams = useSearchParams();
  const pokemon = searchParams.get('pokemon');
  const hotkeys = useGameHotkeys({});

  if (pokemon) {
    return <PBottomNav />;
  }

  return (
    <Navbar align='center' justify='flex-end'>
      <GameButton
        label={'Pick + Flip Page'}
        icon={<GameButton.IconPickFlip />}
        title={`Press ${hotkeys.ArrowLeft}/${hotkeys.ArrowRight} button`}
      />
      <GameButton
        label={'Check'}
        icon={<GameButton.Icon label='A' />}
        onClick={() => triggerGameHotkey({ key: hotkeys.A })}
        title={`Press ${hotkeys.A} button`}
      />
      <GameButton
        label={'Cancel'}
        icon={<GameButton.Icon label='B' />}
        onClick={() => triggerGameHotkey({ key: hotkeys.B })}
        title={`Press ${hotkeys.B} button`}
      />
    </Navbar>
  );
};
