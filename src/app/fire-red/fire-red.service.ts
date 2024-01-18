import { Pokemon, pokemonService } from '@/pokemon';

const isFireRedPokemon = (pokemon: Pokemon): pokemon is Pokemon<'firered'> => {
  return pokemon.gameIndices['firered'] !== undefined;
};

const getDex = async (dex: 'kanto' | 'national') => {
  const limit = dex === 'kanto' ? 151 : 386;
  const pokemons = await pokemonService.getAll({ limit, offset: 0 });

  return pokemons.filter(isFireRedPokemon).sort((a, b) => {
    return a.gameIndices['firered'] - b.gameIndices['firered'];
  });
};

export default {
  getDex,
};
