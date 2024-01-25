import type { Meta } from '@storybook/react';
import PokemonArea from './PokemonArea';

export default {
  title: 'fire-red/Pokemon Area',
  decorators: [
    (Story) => (
      <div style={{ margin: 30 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => {
  return (
    <PokemonArea
      index={6}
      name='Charizard'
      types={['fire', 'flying']}
      height={17}
      sprite='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/6.png'
      icon='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/6.png'
    />
  );
};
