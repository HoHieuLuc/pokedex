import { useQuery } from '@tanstack/react-query';
import fireRedService from './fire-red.service';
import { FireRedDex } from './fire-red.type';

const QUERY_KEYS = {
  dex: (dex: FireRedDex) => ['fire-red', 'dex', dex],
};

const useDex = (dex: FireRedDex) => {
  return useQuery({
    queryKey: QUERY_KEYS.dex(dex),
    queryFn: () => fireRedService.getDex(dex),
  });
};

export default {
  useDex,
};
