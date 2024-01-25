import { Flex, Image } from '@mantine/core';
import classes from './PokemonArea.module.css';
import { Text, TypeBadge } from '@/app/fire-red/_components';
import { PokemonType } from '@/pokemon';

interface Props {
  index: number;
  name: string;
  types: Array<PokemonType>;
  sprite: string;
  icon: string;
  height: number;
}

const PokemonArea = (props: Props) => {
  const { index, name, types, sprite, icon, height } = props;

  // TODO: refactor this
  const characterHeight = 14;
  const pokemonHeight = height;
  const characterPokemonRatio = characterHeight / pokemonHeight;
  const pokemonCharacterRatio = pokemonHeight / characterHeight;

  return (
    <div className={classes.root}>
      <div className={classes['info-wrapper']}>
        <div className={classes.info}>
          <div>
            <Image
              className={classes.icon}
              src={icon}
            />
          </div>
          <div>
            <Text className={classes.index}>No{index.toString().padStart(3, '0')}</Text>
            <Text className={classes.name}>{name}</Text>
            <Flex>
              {types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </Flex>
          </div>
        </div>
        <div className={classes.size}>
          <Text>Size</Text>
          <div className={classes['sillohete-wrapper']}>
            <Image
              className={classes.sillohete}
              src={sprite}
              style={{ '--ratio': characterPokemonRatio < 1 ? 1 : pokemonCharacterRatio }}
            />
            <Image
              className={classes.sillohete}
              src='/fire-red-character-sillohete.png'
              style={{ '--ratio': characterPokemonRatio >= 1 ? 1 : characterPokemonRatio }}
            />
          </div>
        </div>
      </div>
      <div className={classes.area}>
        <Text fz={100}>
          TO
          <Text span fz={3}>
            never
          </Text>
          DO
          <Text span fz={3}>
            unless😳
          </Text>
        </Text>
      </div>
    </div>
  );
};

export default PokemonArea;
