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

  const characterHeight = 14;
  const heightRatio = characterHeight / height;

  const typesExcludingFairy = types.filter((type) => type !== 'fairy');

  return (
    <div className={classes.root}>
      <div className={classes['info-wrapper']}>
        <div className={classes.info}>
          <div>
            <Image className={classes.icon} src={icon} />
          </div>
          <div>
            <Text className={classes.index}>No{index.toString().padStart(3, '0')}</Text>
            <Text className={classes.name}>{name}</Text>
            <Flex>
              {typesExcludingFairy.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
              {typesExcludingFairy.length === 0 && <TypeBadge type='normal' />}
            </Flex>
          </div>
        </div>
        <div className={classes.size}>
          <Text>Size</Text>
          <div className={classes['silhouette-wrapper']}>
            <Image
              className={classes.silhouette}
              src={sprite}
              style={{ '--ratio': heightRatio < 1 ? 1 : 1 / heightRatio }}
            />
            <Image
              className={classes.silhouette}
              src='/assets/fire-red/character-silhouette.png'
              style={{ '--ratio': heightRatio >= 1 ? 1 : heightRatio }}
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
