import fs from 'fs-extra';
import { getPath } from '../utils/get-path';
import datagenService from './datagen.service';
import { PokemonRaw, ResourceData, ResourceList } from './datagen.type';
import toChunks from '../utils/to-chunks';
import cache from '../utils/cache';
import { createLogger } from '../utils/logger';
import { axiosClient } from '@/lib';

const logger = createLogger('datagen');
const limit = 999999;

const generateData = async () => {
  const saveDir = getPath('public');

  await fs.ensureDir(saveDir);
  await fs.ensureDir(cache.CACHE_DIR);

  logger.default.log('Getting all pokemons...');
  const { data } = await axiosClient.get<ResourceList<ResourceData>>('pokemon', {
    params: {
      limit,
    },
  });

  const pokemons = data.results;
  // Split pokemons into chunks
  const pokemonsChunks = toChunks(pokemons, 50);

  logger.default.log('Getting pokemon details...');

  const pokemonDetails: Array<PokemonRaw> = [];

  let progress = 0;
  for (const chunk of pokemonsChunks) {
    await Promise.all(
      chunk.map(async (pokemon) => {
        const data = await datagenService.getPokemon(pokemon.name);
        progress += 1;
        logger.interactive.await(`${progress}/${pokemons.length}`);
        if (data !== null) {
          pokemonDetails.push(data);
        }
        return data;
      }),
    );
  }

  logger.default.success(`${pokemonDetails.length} pokemons loaded`);

  const savedPokemonDetails = pokemonDetails.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    species: pokemon.species,
    order: pokemon.order,
    height: pokemon.height,
    weight: pokemon.weight,
    gameIndices: pokemon.gameIndices.reduce<Record<string, number>>((acc, item) => {
      acc[item.version.name] = item.gameIndex;
      return acc;
    }, {}),
  }));

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
