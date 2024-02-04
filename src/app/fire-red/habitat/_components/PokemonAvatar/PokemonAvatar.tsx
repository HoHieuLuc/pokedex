import classes from './PokemonAvatar.module.css';
import { Text } from '@/app/fire-red/_components';
import PokemonAvatarWrapper from './PokemonAvatarWrapper';
import { SpriteImage } from '@/components';

interface Props {
  position: number;
  active?: boolean;
  sprites: string;
  index: number;
  name: string;
  onClick?: () => void;
}

const PokemonAvatar = ({ position, active, sprites, index, name, onClick }: Props) => {
  return (
    <div className={classes.root} data-active={active}>
      <div className={classes['avatar-wrapper']} onClick={onClick}>
        <SpriteImage className={classes.avatar} src={sprites} />
      </div>
      <div className={classes['description-card']} data-position={position} onClick={onClick}>
        <div className='header'>
          <Text className='index'>No{index.toString().padStart(3, '0')}</Text>
          <Text className='name'>{name}</Text>
        </div>
        <div className='divider'></div>
        <div className='skeleton'>ᛗᛁᛖ ᚾᛖᚷ ᛟ ᚾᚾᚨᚺᚷᛁᛖ</div>
      </div>
    </div>
  );
};

PokemonAvatar.Wrapper = PokemonAvatarWrapper;

export default PokemonAvatar;
