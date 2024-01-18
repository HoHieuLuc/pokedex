import { Pokemon } from '@/pokemon';
import { Flex } from '@mantine/core';
import TypeBadge from '@/app/fire-red/_components/TypeBadge/TypeBadge';
import classes from './PokemonListItem.module.css';
import { Text } from '@/app/fire-red/_components';

interface Props extends Pokemon<'firered'> {
  active: boolean;
}

const PokemonListItem = (props: Props) => {
  const { gameIndices, types, species, active } = props;

  return (
    <div className={classes.root} data-active={active}>
      <Text className={classes.index}>{gameIndices['firered'].toString().padStart(3, '0')}</Text>
      <Text className={classes.name}>{species.name}</Text>
      <Flex>
        {types.map(({ type }) => (
          <TypeBadge key={type.name} type={type.name} />
        ))}
      </Flex>
    </div>
  );
};

export default PokemonListItem;
