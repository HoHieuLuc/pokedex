import { Pokedex, Pokemon } from '@/pokemon';
import PokemonListItem from './PokemonListItem';

export default { title: 'Fire Red/PokemonListItem' };

const pokemon: Pokemon = {
  id: 1,
  height: 1,
  name: 'butterfree',
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
    } as Record<Pokedex, number>,
  },
};

export const Default = () => {
  return (
    <div style={{ background: 'white', padding: 20 }}>
      <PokemonListItem {...pokemon} dex='kanto' active />
    </div>
  );
};
