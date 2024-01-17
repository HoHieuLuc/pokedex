import { useQuery } from '@tanstack/react-query';
import fireRedService from './fire-red.service';

const QUERY_KEYS = {
  kanto: ['fire-red', 'dex', 'kanto'],
};

const useKantoDex = () => {
  return useQuery({
    queryKey: QUERY_KEYS.kanto,
    queryFn: fireRedService.getKantoDex,
  });
};

export default {
  useKantoDex,
};
