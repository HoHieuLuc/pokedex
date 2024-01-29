'use client';

import { GameButton } from '@/app/fire-red/_components';
import { triggerGameHotkey, useGameHotkeys } from '@/hooks';
import { useSearchParams } from 'next/navigation';

const BottomNav = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const hotkeys = useGameHotkeys({});

  return (
    <>
      <GameButton
        label={tab === 'area' ? 'cancel' : 'next data'}
        icon={<GameButton.Icon label={hotkeys.A} />}
        onClick={() => triggerGameHotkey({ key: hotkeys.A })}
      />
      <GameButton
        label={tab === 'area' ? 'previous data' : 'cancel'}
        icon={<GameButton.Icon label={hotkeys.B} />}
        onClick={() => triggerGameHotkey({ key: hotkeys.B })}
      />
    </>
  );
};

export default BottomNav;
