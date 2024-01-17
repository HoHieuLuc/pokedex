import { Pokemon, pokemonService } from '@/pokemon';

const isFireRedPokemon = (pokemon: Pokemon) => {
  return pokemon.gameIndices['firered'];
};

const getKantoDex = async () => {
  const pokemons = await pokemonService.getAll({ limit: 151, offset: 0 });

  return pokemons.filter(isFireRedPokemon).sort((a, b) => {
    return a.gameIndices['firered'] - b.gameIndices['firered'];
  });
};

export default {
  getKantoDex,
};
