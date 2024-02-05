'use client';

import { GameButton, Navbar } from '@/app/fire-red/_components';
import { triggerGameHotkey, useGameHotkeys } from '@/hooks';
import { useSearchParams } from 'next/navigation';

const BottomNav = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const hotkeys = useGameHotkeys({});

  return (
    <Navbar align='center' justify='flex-end'>
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
    </Navbar>
  );
};

export default BottomNav;
