import fs from 'fs-extra';
import datagenService from './datagen.service';
import { axiosClient } from '@/lib';
import { ResourceData, ResourceList } from '@/types';
import { toDictionary } from '@/utils';
import { createLogger, toChunks, getPath, file, cache, isObjectEmpty } from '../utils';

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
  const saveDir = getPath('public/data');

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
      slug: species.name,
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

  const savedPokemonSprites = pokemonDetails.map((pokemon) => {
    return {
      id: pokemon.id,
      sprites: pokemon.sprites,
    };
  });

  logger.default.log('Writing data...');
  await file.writeJSON(`${saveDir}/pokemon.json`, savedPokemonDetails);

  const ignoredSpritesKeys = ['other', 'generation-i', 'generation-ii'];
  await file.writeJSON(`${saveDir}/pokemon.sprites.json`, savedPokemonSprites, {
    replacer: (key, value: unknown) => {
      if (
        key.startsWith('back') ||
        key.toLowerCase().includes('shiny') ||
        ignoredSpritesKeys.includes(key)
      ) {
        return undefined;
      }
      if (value === null) {
        return undefined;
      }
      if (typeof value === 'object' && isObjectEmpty(value)) {
        return undefined;
      }
      if (typeof value === 'string') {
        return value.replace(
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
          '',
        );
      }
      return value;
    },
  });
  logger.default.success('All done!');
};

export default generateData;
