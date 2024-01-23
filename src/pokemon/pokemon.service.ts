import { PokemonResponse, PokemonSpeciesResponse } from '@/types';
import { Pokemon } from './pokemon.type';
import { axiosClient } from '@/lib';
import { toDictionary } from '@/utils';

const getAll = async () => {
  const { data } = await axiosClient.get<Array<Pokemon>>('/pokemon.json', {
    baseURL: '',
  });
  return data;
};

const getEnglishResource = (data: { language: { name: string } }) => {
  return data.language.name === 'en';
};

const getByName = async (name: string) => {
  const { data: pokemon } = await axiosClient.get<PokemonResponse>(`/pokemon/${name}`);
  if (!pokemon) {
    return null;
  }
  const { data: pokemonSpecies } = await axiosClient.get<PokemonSpeciesResponse>(
    `/pokemon-species/${name}`,
  );

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

  const types = pokemon.types.map((type) => type.type.name);
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

export default {
  getAll,
  getByName,
};
