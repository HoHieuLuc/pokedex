import { PokemonResponse, PokemonSpeciesResponse } from '@/types';
import { Pokedex, Pokemon, PokemonDetails, PokemonType } from './pokemon.type';
import { axiosClient } from '@/lib';
import { toDictionary } from '@/utils';
import { POKEMON_TYPES_MAP } from '@/config';

const getAll = async () => {
  const { data } = await axiosClient.get<Array<Pokemon>>('/data/pokemon.json', {
    baseURL: '',
  });
  return data;
};

const getEnglishResource = (data: { language: { name: string } }) => {
  return data.language.name === 'en';
};

const getByName = async (name: string): Promise<PokemonDetails | null> => {
  const { data: pokemonSpecies } = await axiosClient.get<PokemonSpeciesResponse>(
    `/pokemon-species/${name}`,
  );
  if (!pokemonSpecies) {
    return null;
  }
  const { data: pokemon } = await axiosClient.get<PokemonResponse>(`/pokemon/${pokemonSpecies.id}`);

  // flavor text
  const flavorTextEntries = pokemonSpecies.flavorTextEntries.filter(getEnglishResource);
  const flavorTexts = toDictionary({
    data: flavorTextEntries,
    key: (item) => item.version.name,
    value: (item) => item.flavorText,
  });

  // pokedex number
  const pokedexNumbers = toDictionary({
    data: pokemonSpecies.pokedexNumbers,
    key: (item) => item.pokedex.name,
    value: (item) => item.entryNumber,
  });

  const types = pokemon.types.map((type) => type.type.name as PokemonType);
  const pokemonName = pokemonSpecies.names.find(getEnglishResource)?.name || pokemon.name;
  const genus = pokemonSpecies.genera.find(getEnglishResource)?.genus || '';

  return {
    genus,
    types,
    flavorTexts,
    pokedexNumbers,
    id: pokemon.id,
    name: pokemonName,
    height: pokemon.height,
    weight: pokemon.weight,
    sprites: pokemon.sprites,
  };
};

interface SortByPokemonTypeProps {
  firstPokemon: Pokemon;
  secondPokemon: Pokemon;
  dex: Pokedex;
}

const sortByPokemonType = ({ firstPokemon, secondPokemon, dex }: SortByPokemonTypeProps) => {
  const firstPokemonTypes = {
    primary: POKEMON_TYPES_MAP[firstPokemon.types[0].type.name],
    secondary: POKEMON_TYPES_MAP[firstPokemon.types[1]?.type.name],
  };

  const secondPokemonTypes = {
    primary: POKEMON_TYPES_MAP[secondPokemon.types[0].type.name],
    secondary: POKEMON_TYPES_MAP[secondPokemon.types[1]?.type.name],
  };

  if (firstPokemonTypes.primary < secondPokemonTypes.primary) {
    return -1;
  }
  if (firstPokemonTypes.primary > secondPokemonTypes.primary) {
    return 1;
  }
  // same primary type
  // if none has secondary type => sort by dex index
  if (!firstPokemonTypes.secondary && !secondPokemonTypes.secondary) {
    return firstPokemon.species.pokedexNumbers[dex] - secondPokemon.species.pokedexNumbers[dex];
  }
  // if only one has secondary type
  if (firstPokemon.types.length !== secondPokemon.types.length) {
    return firstPokemon.types.length - secondPokemon.types.length;
  }
  if (firstPokemonTypes.secondary < secondPokemonTypes.secondary) {
    return -1;
  }
  if (firstPokemonTypes.secondary > secondPokemonTypes.secondary) {
    return 1;
  }
  // if both have the same secondary type => sort by id
  return firstPokemon.species.pokedexNumbers[dex] - secondPokemon.species.pokedexNumbers[dex];
};

interface GetSortedPokemonsProps {
  pokemons: Array<Pokemon>;
  sort: string;
  dex: Pokedex;
}

const getSortedPokemons = ({ pokemons, sort, dex }: GetSortedPokemonsProps) => {
  const copied = [...pokemons];

  return copied.sort((firstPokemon, secondPokemon) => {
    switch (sort) {
      case 'type': {
        return sortByPokemonType({ firstPokemon, secondPokemon, dex });
      }
      case 'lightest': {
        return firstPokemon.weight - secondPokemon.weight;
      }
      case 'smallest': {
        return firstPokemon.height - secondPokemon.height;
      }
      default: {
        const firstPokemonName = firstPokemon.name.toUpperCase();
        const secondPokemonName = secondPokemon.name.toUpperCase();
        if (firstPokemonName < secondPokemonName) {
          return -1;
        }
        if (firstPokemonName > secondPokemonName) {
          return 1;
        }
        return 0;
      }
    }
  });
};

export default {
  getAll,
  getByName,
  getSortedPokemons,
};
