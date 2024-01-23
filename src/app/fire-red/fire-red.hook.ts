import { useQuery } from '@tanstack/react-query';
import { FireRedDex } from './fire-red.type';
import fireRedService from './fire-red.service';
import { pokemonHook } from '@/pokemon';

const QUERY_KEYS = {
  dex: (dex: FireRedDex) => ['fire-red', 'dex', dex],
};

const useDex = (dex: FireRedDex) => {
  return useQuery({
    queryKey: QUERY_KEYS.dex(dex),
    queryFn: () => fireRedService.getDex(dex),
  });
};

const useByName = (name: string) => {
  const { data, ...query } = pokemonHook.useByName(name);

  return {
    ...query,
    data: data?.sprites.versions?.['generation-iii']?.['firered-leafgreen'] ? data : null,
  };
};

export default {
  useDex,
  useByName,
};
