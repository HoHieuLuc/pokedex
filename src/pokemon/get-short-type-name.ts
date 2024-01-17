import { PokemonType } from './pokemon.type';

const getShortTypeName = (type: PokemonType) => {
  switch (type) {
    case 'electric':
      return 'electr';
    case 'fighting':
      return 'fight';
    case 'psychic':
      return 'psychc';
    default:
      return type;
  }
};

export default getShortTypeName;
