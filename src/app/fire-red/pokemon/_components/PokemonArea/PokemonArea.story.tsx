import type { Meta } from '@storybook/react';
import PokemonArea from './PokemonArea';
import { createMeta } from '@/app/fire-red/_storybook';

export default {
  title: 'fire-red/Pokemon Area',
  ...createMeta(),
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
