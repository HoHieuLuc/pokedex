import fs from 'fs-extra';
import { getPath } from '../utils/get-path';
import datagenService from './datagen.service';
import toChunks from '../utils/to-chunks';
import cache from '../utils/cache';
import { createLogger } from '../utils/logger';
import { axiosClient } from '@/lib';
import { ResourceData, ResourceList } from '@/types';
import { toDictionary } from '@/utils';

const logger = createLogger('datagen');
const limit = 999999;

interface GetResourceDetailsProps<T> {
  data: Array<ResourceData>;
  queryFn: (value: ResourceData) => Promise<T>;
  resourceName: string;
}

const getResourceDetails = async <T>({
  data,
  queryFn,
  resourceName,
}: GetResourceDetailsProps<T>) => {
  const chunks = toChunks(data, 50);

  logger.default.log(`Getting ${resourceName} details...`);

  const result: Array<T> = [];
  let progress = 0;
  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (item) => {
        const _data = await queryFn(item);
        progress += 1;
        logger.interactive.await(`${progress}/${data.length}`);
        if (_data !== null) {
          result.push(_data);
        }
        return _data;
      }),
    );
  }

  logger.default.success(`${result.length} ${resourceName} loaded`);

  return result as Array<NonNullable<T>>;
};

const getAllPokemons = async () => {
  logger.default.log('Getting all pokemons...');

  const { data } = await axiosClient.get<ResourceList<ResourceData>>('pokemon', {
    params: {
      limit,
    },
  });

  return getResourceDetails({
    data: data.results,
    queryFn: (pokemon) => datagenService.getPokemon(pokemon.name),
    resourceName: 'pokemons',
  });
};

const getAllPokemonSpecies = async () => {
  logger.default.log('Getting all pokemon species...');
  const { data } = await axiosClient.get<ResourceList<ResourceData>>('pokemon-species', {
    params: {
      limit,
    },
  });

  return getResourceDetails({
    data: data.results,
    queryFn: (pokemon) => datagenService.getPokemonSpecies(pokemon.name),
    resourceName: 'pokemon species',
  });
};

const generateData = async () => {
  const saveDir = getPath('public');

  await fs.ensureDir(saveDir);
  await fs.ensureDir(cache.CACHE_DIR);

  const pokemonDetails = await getAllPokemons();
  const pokemonSpecies = await getAllPokemonSpecies();
  const pokemonSpeciesDictionary = toDictionary({
    data: pokemonSpecies,
    key: (item) => item.name,
    value: (item) => item,
  });

  const savedPokemonDetails = pokemonDetails.map((pokemon) => {
    const species = pokemonSpeciesDictionary[pokemon.species.name];
    const speciesName =
      species.names.find((item) => item.language.name === 'en')?.name || species.name;
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      order: pokemon.order,
      height: pokemon.height,
      weight: pokemon.weight,
      species: {
        habitat: species.habitat?.name,
        name: speciesName,
        pokedexNumbers: toDictionary({
          data: species.pokedexNumbers,
          key: (item) => item.pokedex.name,
          value: (item) => item.entryNumber,
        }),
      },
    };
  });

  logger.default.log('Writing data...');
  await fs.writeJSON(`${saveDir}/pokemon.json`, savedPokemonDetails, {
    spaces: 0,
    replacer: (_key, value: unknown) => {
      if (value === null) {
        return undefined;
      }
      return value;
    },
  });
  logger.default.success('All done!');
};

export default generateData;
