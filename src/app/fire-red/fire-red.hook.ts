import { useQuery } from '@tanstack/react-query';
import fireRedService from './fire-red.service';

const QUERY_KEYS = {
  dex: (dex: 'kanto' | 'national') => ['fire-red', 'dex', dex],
};

const useDex = (dex: 'kanto' | 'national') => {
  return useQuery({
    queryKey: QUERY_KEYS.dex(dex),
    queryFn: () => fireRedService.getDex(dex),
  });
};

export default {
  useDex,
};
