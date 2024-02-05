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
    <Navbar align='flex-end' justify='flex-end'>
      <GameButton label={'Pick + Flip Page'} icon={<GameButton.IconPick />} />
      <GameButton
        label={'Check'}
        icon={<GameButton.Icon label={hotkeys.A} />}
        onClick={() => triggerGameHotkey({ key: hotkeys.A })}
      />
      <GameButton
        label={'Cancel'}
        icon={<GameButton.Icon label={hotkeys.B} />}
        onClick={() => triggerGameHotkey({ key: hotkeys.B })}
      />
    </Navbar>
  );
};
