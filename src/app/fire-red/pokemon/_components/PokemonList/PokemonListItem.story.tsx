import { PokedexNumbers, Pokemon } from '@/pokemon';
import PokemonListItem from './PokemonListItem';
import { createMeta } from '@/app/fire-red/_storybook';

export default { title: 'Fire Red/PokemonListItem', ...createMeta() };

const pokemon: Omit<Pokemon, 'sprites'> = {
  id: 1,
  height: 1,
  name: 'butterfree',
  slug: 'butterfree',
  order: 1,
  types: [
    {
      slot: 1,
      type: {
        name: 'normal',
      },
    },
    {
      slot: 2,
      type: {
        name: 'electric',
      },
    },
  ],
  weight: 1,
  species: {
    name: 'butterfree',
    pokedexNumbers: {
      kanto: 1,
    } as PokedexNumbers,
  },
};

export const Default = () => {
  return (
    <div style={{ background: 'white', padding: 20 }}>
      <PokemonListItem {...pokemon} dex='kanto' active />
    </div>
  );
};
