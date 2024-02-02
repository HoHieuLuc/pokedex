import { PokemonSprites } from '@/types';

export interface Pokemon {
  id: number;
  name: string;
  slug: string;
  types: PokemonTypeData[];
  species: PokemonSpecies;
  sprites: PokemonSprites;
  order: number;
  height: number;
  weight: number;
}

interface PokemonSpecies {
  name: string;
  habitat?: PokemonHabitat;
  pokedexNumbers: PokedexNumbers;
}

export type PokemonHabitat =
  | 'grassland'
  | 'mountain'
  | 'waters-edge'
  | 'forest'
  | 'rough-terrain'
  | 'cave'
  | 'urban'
  | 'sea'
  | 'rare';

export interface PokemonTypeData {
  slot: number;
  type: {
    name: PokemonType;
  };
}

export type PokemonType =
  | 'grass'
  | 'poison'
  | 'fire'
  | 'flying'
  | 'water'
  | 'bug'
  | 'normal'
  | 'electric'
  | 'ground'
  | 'fairy'
  | 'fighting'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'ice'
  | 'ghost'
  | 'dragon'
  | 'dark';

export type Pokedex =
  | 'national'
  | 'kanto'
  | 'original-johto'
  | 'hoenn'
  | 'original-sinnoh'
  | 'extended-sinnoh'
  | 'updated-johto'
  | 'original-unova'
  | 'updated-unova'
  | 'conquest-gallery'
  | 'kalos-central'
  | 'kalos-coastal'
  | 'kalos-mountain'
  | 'updated-hoenn'
  | 'original-alola'
  | 'original-melemele'
  | 'original-akala'
  | 'original-ulaula'
  | 'original-poni'
  | 'updated-alola'
  | 'updated-melemele'
  | 'updated-akala'
  | 'updated-ulaula'
  | 'updated-poni'
  | 'letsgo-kanto'
  | 'galar'
  | 'isle-of-armor'
  | 'crown-tundra'
  | 'hisui'
  | 'paldea'
  | 'kitakami'
  | 'blueberry';

export type PokedexNumbers = Record<Pokedex, number>;

export interface PokemonDetails {
  genus: string;
  types: Array<PokemonType>;
  flavorTexts: Record<string, string>;
  pokedexNumbers: Record<string, number>;
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
}
