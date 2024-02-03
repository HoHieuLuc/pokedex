import { PokemonHabitat, PokemonType } from '@/pokemon';

/** The word "POKéMON" */
export const POKEMON = 'POKéMON';
/** The word "POKéDEX" */
export const POKEDEX = 'POKéDEX';

export const BASE_SPRITES_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export const POKEMON_TYPES: Array<PokemonType> = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
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

export const POKEMON_TYPES_MAP: Record<PokemonType, number> = POKEMON_TYPES.reduce(
  (acc, cur, index) => {
    acc[cur] = index;
    return acc;
  },
  {} as Record<PokemonType, number>,
);

export const POKEMON_HABITATS: Record<PokemonHabitat, string> = {
  grassland: 'Grassland',
  forest: 'Forest',
  'waters-edge': `Water's edge`,
  sea: 'Sea',
  cave: 'Cave',
  mountain: 'Mountain',
  'rough-terrain': 'Rough-terrain',
  urban: 'Urban',
  rare: 'Rare',
};
