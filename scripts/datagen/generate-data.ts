import { ResourceList } from './resource-list.type';
import { getPath } from '../utils/get-path';
import axiosClient from '../../src/lib/axios-client';
import fs from 'fs-extra';
import { PokemonRaw } from './pokemon-raw.type';

interface PokemonListItem {
  name: string;
  url: string;
}

const getPokemon = async (name: string) => {
  try {
    const { data } = await axiosClient.get<PokemonRaw>(`pokemon/${name}`);
    return data;
  } catch {
    console.error(`Get pokemon ${name} failed`);
    return null;
  }
};

const limit = 1025;

const generateData = async () => {
  const saveDir = getPath('src/data');
  const saveFile = `${saveDir}/pokemon.json`;

  if (fs.existsSync(saveFile)) {
    console.log('Data already exists');
    return;
  }

  await fs.ensureDir(saveDir);

  console.log('Getting all pokemons...');
  const { data } = await axiosClient.get<ResourceList<PokemonListItem>>('pokemon', {
    params: {
      limit,
    },
  });

  const pokemons = data.results;
  // Split pokemons into chunks
  const pokemonsChunks = pokemons.reduce<PokemonListItem[][]>(
    (chunks, pokemon, index) => {
      const chunkIndex = Math.floor(index / 50);
      if (!chunks[chunkIndex]) {
        chunks[chunkIndex] = [];
      }
      chunks[chunkIndex].push(pokemon);
      return chunks;
    },
    []
  );

  console.log('Getting pokemon details...');

  const pokemonDetails: Array<PokemonRaw> = [];

  let progress = 0;
  for (const chunk of pokemonsChunks) {
    await Promise.all(
      chunk.map(async (pokemon) => {
        const data = await getPokemon(pokemon.name);
        progress += 1;
        console.log(`${progress}/${pokemons.length}`);
        if (data !== null) {
          pokemonDetails.push(data);
        }
        return data;
      })
    );
  }

  console.log(`${pokemonDetails.length} pokemons loaded`);

  const savedPokemonDetails = pokemonDetails.map(pokemon => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    species: pokemon.species,
    order: pokemon.order,
    height: pokemon.height,
    weight: pokemon.weight,
  }));

  console.log('Writing data...');
  await fs.writeJSON(`${saveDir}/pokemon.json`, savedPokemonDetails, {
    spaces: 0,
    replacer: (_, value: unknown) => {
      if (value === null) {
        return undefined;
      }
      return value;
    }
  });
  console.log('All done!');
};

export default generateData;
