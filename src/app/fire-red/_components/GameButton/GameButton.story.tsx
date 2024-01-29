import GameButton from './GameButton';

export default {
  title: 'Fire Red/GameButton',
};

export const Default = () => {
  return (
    <>
      <GameButton label='pick' icon={<GameButton.IconPick />}></GameButton>
      <GameButton label='ok' icon={<GameButton.Icon label='a' />}></GameButton>
    </>
  );
};
