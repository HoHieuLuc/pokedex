'use client';

import { GameButton, Navbar } from '@/app/fire-red/_components';
import { triggerGameHotkey, useGameHotkeys } from '@/hooks';

const BottomNav = () => {
  const hotkeys = useGameHotkeys({});

  return (
    <Navbar align='center' justify='flex-end'>
      <GameButton
        label='pick'
        icon={<GameButton.IconPick />}
        title={`Press ${hotkeys.ArrowDown}/${hotkeys.ArrowUp} button`}
      />
      <GameButton
        label='ok'
        icon={<GameButton.Icon label='A' />}
        onClick={() => triggerGameHotkey({ key: hotkeys.A })}
        title={`Press ${hotkeys.A} button`}
      />
      <GameButton
        label='cancel'
        icon={<GameButton.Icon label='B' />}
        onClick={() => triggerGameHotkey({ key: hotkeys.B })}
        title={`Press ${hotkeys.B} button`}
      />
    </Navbar>
  );
};

export default BottomNav;
