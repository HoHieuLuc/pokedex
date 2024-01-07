import pokemon from '@/data/pokemon.json';
import { GetAllPayload } from './pokemon.type';

const getAll = ({ limit, offset }: GetAllPayload = { limit: Infinity, offset: 0 }) => {
  return pokemon.slice(offset, offset + limit);
};

export default {
  getAll,
};
