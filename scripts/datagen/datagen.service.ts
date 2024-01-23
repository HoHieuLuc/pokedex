import { axiosClient } from '@/lib';
import cache from '../utils/cache';
import { createLogger } from '../utils/logger';
import { PokemonResponse, PokemonSpeciesResponse } from '@/types';

const logger = createLogger('datagen');

const get = async <T>(path: string) => {
  const cachedData = await cache.read<T>(`${path}.json`);
  if (cachedData) {
    return cachedData;
  }
  try {
    const { data } = await axiosClient.get<T>(path);
    await cache.write(`${path}.json`, data);
    return data;
  } catch (error) {
    logger.default.error(`Get ${path} failed`, error);
    return null;
  }
};

const getPokemon = async (name: string) => {
  return get<PokemonResponse>(`/pokemon/${name}`);
};

const getPokemonSpecies = async (name: string) => {
  return get<PokemonSpeciesResponse>(`/pokemon-species/${name}`);
};

export default {
  getPokemon,
  getPokemonSpecies,
};
