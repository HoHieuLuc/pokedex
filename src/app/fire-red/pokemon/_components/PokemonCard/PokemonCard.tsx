import { Text } from '@/app/fire-red/_components';
import { SpriteImage } from '@/components';
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

const heightInFeet = (height: number) => {
  const [feet, inches] = Math.round(height / 3.048)
    .toFixed(2)
    .split('.');

  return `${feet}'${inches}"`;
};

const weightInPounds = (weight: number) => {
  return `${((weight / 10) * 2.205).toFixed(1)} lbs.`;
};

const PokemonCard = (props: Props) => {
  const { index, name, genus, height, weight, sprite, flavorText } = props;

  return (
    <div className={classes.root}>
      <div className={classes['general-info']}>
        <div className={classes['general-info-text']}>
          <Text className='title'>
            <Text span>No{index.toString().padStart(3, '0')}</Text> {name}
          </Text>
          <Text>{genus}</Text>
          <div className={classes['general-info-stat-grid']}>
            <Text>HT</Text>
            <Text>{heightInFeet(height)}</Text>
            <Text>WT</Text>
            <Text>{weightInPounds(weight)}</Text>
          </div>
        </div>
        <div className={classes['general-info-sprite']}>
          <SpriteImage className='sprite' src={sprite} />
        </div>
      </div>
      <div className={classes.divider}></div>
      <div className={classes.description}>
        <Text>
          {flavorText || 'ᚷᚨᚺ ᛉᚨᚾ ᛏᚨᚲ ᚷᚨᚺ ᛉᚨᚾ ᛏᚨᛏ ᛏᚨᛏ ᛒᚱᚨ ᚷᚨᚺ ᛉᚨᚾ ᛏᚨᚲ ᚷᚨᚺ ᛉᚨᚾ ᛏᚨᛏ ᛏᚨᛏ ᛒᚱᚨ'}
        </Text>
      </div>
    </div>
  );
};
export default PokemonCard;
