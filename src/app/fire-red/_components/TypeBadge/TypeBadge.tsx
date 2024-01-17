import { PokemonType, getShortTypeName } from '@/pokemon';
import Text from '../Text/Text';
import classes from './TypeBadge.module.css';

interface Props {
  type: PokemonType;
}

const TypeBadge = ({ type }: Props) => {
  return (
    <div className={classes.root} data-type={type}>
      <Text variant='white'>{getShortTypeName(type)}</Text>
    </div>
  );
};

export default TypeBadge;
