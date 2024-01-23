import { Text } from '@/app/fire-red/_components';
import { Image } from '@mantine/core';
import classes from './PokemonCard.module.css';

interface Props {
  index: number;
  name: string;
  genus: string;
  height: number;
  weight: number;
  sprite: string;
  flavorText: string;
}

const PokemonCard = (props: Props) => {
  const { index, name, genus, height, weight, sprite, flavorText } = props;

  return (
    <div className={classes.root}>
      <div className={classes.generalInfo}>
        <div className={classes.generalInfoText}>
          <Text className='title'>
            <Text span>No{index.toString().padStart(3, '0')}</Text> {name}
          </Text>
          <Text>{genus}</Text>
          <Text>HT {height}</Text>
          <Text>WT {weight} lbs.</Text>
        </div>
        <div className={classes.generalInfoSprite}>
          <Image className='sprite' src={sprite} />
        </div>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.description}>
        <Text>{flavorText}</Text>
      </div>
    </div>
  );
};
export default PokemonCard;
