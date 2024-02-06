import { Pokemon } from '@/pokemon';
import fs from 'fs-extra';
import path from 'path';

const readJSON = <T>(file: string) => {
  return fs.readJSON(path.join(process.cwd(), file)) as Promise<T>;
};

const readPokemons = () => {
  return readJSON<Array<Pokemon>>('/public/data/pokemon.json');
};

export default {
  readJSON,
  readPokemons,
};
