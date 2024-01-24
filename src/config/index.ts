import { PokemonType } from '@/pokemon';

/** The word "POKéMON" */
export const POKEMON = 'POKéMON';
/** The word "POKéDEX" */
export const POKEDEX = 'POKéDEX';

export const POKEMON_TYPES: Array<PokemonType> = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
];

export const POKEDEX_RANGES = {
  kanto: {
    min: 1,
    max: 151,
  },
  fireRedNational: {
    min: 1,
    max: 386,
  },
};
