export interface Pokemon {
  id: number;
  name: string;
  types: PokemonTypeData[];
  species: PokemonSpecies;
  order: number;
  height: number;
  weight: number;
}

interface PokemonSpecies {
  habitat?: PokemonHabitat;
  name: string;
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

interface PokemonTypeData {
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
