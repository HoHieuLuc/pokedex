import axios from 'axios';
import { GetAllPayload, Pokemon } from './pokemon.type';

const getAll = async ({ limit, offset }: GetAllPayload = { limit: Infinity, offset: 0 }) => {
  const { data } = await axios.get<Array<Pokemon>>('/pokemon.json');
  return data.slice(offset, offset + limit);
};

export default {
  getAll,
};
