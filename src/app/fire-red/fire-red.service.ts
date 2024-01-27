import { PokemonTypeData, pokemonService } from '@/pokemon';
import { FireRedDex } from './fire-red.type';
import { POKEDEX_RANGES } from '@/config';

const getDex = async (dex: FireRedDex) => {
  const pokemons = await pokemonService.getAll();
  const normalType: PokemonTypeData = {
    slot: 1,
    type: { name: 'normal' },
  };

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
    })
    .map((pokemon) => {
      const typesExcludingFairy = pokemon.types.filter((type) => type.type.name !== 'fairy');

      return {
        ...pokemon,
        types: typesExcludingFairy.length === 0 ? [normalType] : typesExcludingFairy,
      };
    });
};

export default {
  getDex,
};
