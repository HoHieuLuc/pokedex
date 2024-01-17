'use client';

import fireRedHook from '@/app/fire-red/fire-red.hook';
import PokemonListItem from './PokemonListItem';

const PokemonList = () => {
  const { data, isLoading } = fireRedHook.useKantoDex();

  if (isLoading) {
    return <div>loading</div>;
  }

  const pokemonItems = data?.map((pokemon) => <PokemonListItem key={pokemon.id} {...pokemon} />);

  return <div>{pokemonItems}</div>;
};

export default PokemonList;
