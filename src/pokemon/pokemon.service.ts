import pokemon from '@/data/pokemon.json';
import { GetAllPayload, Pokemon } from './pokemon.type';

const getAll = ({ limit, offset }: GetAllPayload = { limit: Infinity, offset: 0 }) => {
  return pokemon.slice(offset, offset + limit) as Array<Pokemon>;
};

export default {
  getAll,
};
