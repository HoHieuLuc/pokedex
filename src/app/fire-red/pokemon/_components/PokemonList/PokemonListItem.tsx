import { Pokemon } from '@/pokemon';
import { Flex } from '@mantine/core';
import TypeBadge from '@/app/fire-red/_components/TypeBadge/TypeBadge';
import classes from './PokemonListItem.module.css';
import { Text } from '@/app/fire-red/_components';
import { FireRedDex } from '@/app/fire-red';

interface Props extends Omit<Pokemon, 'sprites'> {
  active: boolean;
  dex: FireRedDex;
}

const PokemonListItem = (props: Props) => {
  const { types, species, active, dex } = props;

  return (
    <div className={classes.root} data-active={active}>
      <Text className={classes.index}>
        {species.pokedexNumbers[dex].toString().padStart(3, '0')}
      </Text>
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
