import { Image } from '@mantine/core';
import classes from './PokemonAvatar.module.css';
import { Text } from '@/app/fire-red/_components';
import PokemonAvatarWrapper from './PokemonAvatarWrapper';

interface Props {
  position: number;
  active: boolean;
  sprites: string;
  index: number;
  name: string;
}

const PokemonAvatar = ({ position, active, sprites, index, name }: Props) => {
  return (
    <div className={classes.root} data-active={active}>
      <div className={classes['avatar-wrapper']}>
        <Image className={classes.avatar} src={sprites} />
      </div>
      <div className={classes['description-card']} data-position={position}>
        <div className='header'>
          <Text className='index'>No{index.toString().padStart(3, '0')}</Text>
          <Text className='name'>{name}</Text>
        </div>
        <div className='divider'></div>
        <div className='skeleton'>⣶⣾⣿⣿⢤⣾⣿⣿⣶⣤</div>
      </div>
    </div>
  );
};

PokemonAvatar.Wrapper = PokemonAvatarWrapper;

export default PokemonAvatar;
