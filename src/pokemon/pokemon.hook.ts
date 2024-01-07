import { useQuery } from '@tanstack/react-query';
import { GetAllPayload } from './pokemon.type';
import pokemonService from './pokemon.service';

const QUERY_KEYS = {
  list: (payload?: GetAllPayload) => ['pokemon', 'list', payload],
};

const useAll = (payload?: GetAllPayload) => {
  return useQuery({
    queryKey: QUERY_KEYS.list(payload),
    queryFn: () => pokemonService.getAll(payload),
  });
};

export default {
  useAll,
};
