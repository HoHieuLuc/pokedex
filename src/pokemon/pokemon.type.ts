export interface GetAllPayload {
  limit: number;
  offset: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonTypeData[];
  species: Species;
  order: number;
  height: number;
  weight: number;
  gameIndices: Record<VersionName, number>;
}

export type VersionName =
  | 'red'
  | 'blue'
  | 'yellow'
  | 'gold'
  | 'silver'
  | 'crystal'
  | 'ruby'
  | 'sapphire'
  | 'emerald'
  | 'firered'
  | 'leafgreen'
  | 'diamond'
  | 'pearl'
  | 'platinum'
  | 'heartgold'
  | 'soulsilver'
  | 'black'
  | 'white'
  | 'black-2'
  | 'white-2'
  | 'omega-ruby';

export interface Species {
  name: string;
}

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
