'use client';

import { GameButton } from '@/app/fire-red/_components';
import { triggerGameHotkey, useGameHotkeys } from '@/hooks';

const BottomNav = () => {
  const hotkeys = useGameHotkeys({});

  return (
    <>
      <GameButton label='pick' icon={<GameButton.IconPick />} />
      <GameButton
        label='ok'
        icon={<GameButton.Icon label={hotkeys.A} />}
        onClick={() => triggerGameHotkey({ key: hotkeys.A })}
      />
      <GameButton
        label='cancel'
        icon={<GameButton.Icon label={hotkeys.B} />}
        onClick={() => triggerGameHotkey({ key: hotkeys.B })}
      />
    </>
  );
};

export default BottomNav;
