import { pokemonService } from '@/pokemon';
import { FireRedDex } from './fire-red.type';
import { POKEDEX_RANGES } from '@/config';

const getDex = async (dex: FireRedDex) => {
  const pokemons = await pokemonService.getAll();

  return pokemons
    .filter((pokemon) => {
      return (
        pokemon.species.pokedexNumbers[dex] !== undefined &&
        pokemon.species.pokedexNumbers[dex] <= POKEDEX_RANGES.fireRedNational.max
      );
    })
    .slice(0, dex === 'kanto' ? POKEDEX_RANGES.kanto.max : POKEDEX_RANGES.fireRedNational.max)
    .sort((a, b) => {
      return a.species.pokedexNumbers[dex] - b.species.pokedexNumbers[dex];
    });
};

export default {
  getDex,
};
