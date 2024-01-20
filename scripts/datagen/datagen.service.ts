import { axiosClient } from '@/lib';
import cache from '../utils/cache';
import { PokemonRaw, PokemonSpecies } from './datagen.type';
import { createLogger } from '../utils/logger';

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
  return get<PokemonRaw>(`pokemon/${name}`);
};

const getPokemonSpecies = async (name: string) => {
  return get<PokemonSpecies>(`pokemon-species/${name}`);
};

export default {
  getPokemon,
  getPokemonSpecies,
};
