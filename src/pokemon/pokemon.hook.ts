import { useQuery } from '@tanstack/react-query';
import pokemonService from './pokemon.service';
import { useMemo } from 'react';
import { PokemonDetails } from './pokemon.type';

const QUERY_KEYS = {
  list: ['pokemon', 'list'],
  details: (name: string) => ['pokemon', 'details', name],
  sprites: ['pokemon', 'sprites'],
};

const useAll = () => {
  return useQuery({
    queryKey: QUERY_KEYS.list,
    queryFn: pokemonService.getAll,
  });
};

const useAllSprites = () => {
  return useQuery({
    queryKey: QUERY_KEYS.sprites,
    queryFn: pokemonService.getAllSprites,
  });
};

/**
 * Get next and previous pokemon names.
 * @param id - Current pokemon id.
 */
const useNextAndPrevious = (id?: number) => {
  const { data } = useAll();

  const next = useMemo(() => {
    return data?.find((pokemon) => id && pokemon.id === id + 1);
  }, [data, id]);

  const previous = useMemo(() => {
    return data?.find((pokemon) => id && pokemon.id === id - 1);
  }, [data, id]);

  return { next, previous };
};

const useByName = (name: string) => {
  const { data: pokemons } = useAll();
  const placeholder = pokemons?.find((pokemon) => pokemon.slug === name);
  const placeholderData: PokemonDetails | undefined = placeholder && {
    ...placeholder,
    genus: '??? Pokémon',
    pokedexNumbers: placeholder.species.pokedexNumbers,
    name: placeholder.species.name,
    flavorTexts: {},
    types: [],
  };

  const { data, ...query } = useQuery({
    queryKey: QUERY_KEYS.details(name),
    queryFn: () => pokemonService.getByName(name),
    placeholderData,
  });
  const { next, previous } = useNextAndPrevious(data?.id);

  return {
    ...query,
    data,
    /** The next pokemon. */
    next,
    /** The previous pokemon. */
    previous,
  };
};

export default {
  useAll,
  useByName,
  useNextAndPrevious,
  useAllSprites,
  QUERY_KEYS,
};
