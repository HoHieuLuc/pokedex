import { useQuery } from '@tanstack/react-query';
import pokemonService from './pokemon.service';

const QUERY_KEYS = {
  list: ['pokemon', 'list'],
  details: (name: string) => ['pokemon', 'details', name],
};

const useAll = () => {
  return useQuery({
    queryKey: QUERY_KEYS.list,
    queryFn: pokemonService.getAll,
  });
};

const useByName = (name: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.details(name),
    queryFn: () => pokemonService.getByName(name),
  });
};

export default {
  useAll,
  useByName,
};
