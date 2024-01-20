import { pokemonService } from '@/pokemon';
import { FireRedDex } from './fire-red.type';

const getDex = async (dex: FireRedDex) => {
  const pokemons = await pokemonService.getAll();

  return pokemons
    .filter((pokemon) => pokemon.species.pokedexNumbers[dex] !== undefined)
    .slice(0, dex === 'kanto' ? 151 : 386)
    .sort((a, b) => {
      return a.species.pokedexNumbers[dex] - b.species.pokedexNumbers[dex];
    });
};

export default {
  getDex,
};
