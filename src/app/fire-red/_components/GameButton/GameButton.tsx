import { Image } from '@mantine/core';
import Text from '../Text/Text';
import classes from './GameButton.module.css';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface IconProps {
  label: string;
}

const Icon = ({ label }: IconProps) => {
  return <span className={classes.icon}>{label}</span>;
};

const IconPick = () => {
  return (
    <Image src='/assets/fire-red/icon-pick.png' alt='icon pick' className={classes['icon-pick']} />
  );
};

const IconPickFlip = () => {
  return (
    <Image
      src='/assets/fire-red/icon-pick-flip.png'
      alt='icon pick'
      className={classes['icon-pick']}
    />
  );
};

interface GameButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  label: string;
  icon: React.ReactNode;
}

const GameButton = ({ label, icon, ...props }: GameButtonProps) => {
  return (
    <button className={classes.root} {...props}>
      {icon}
      <Text className='label' variant='white' fz={45}>
        {label}
      </Text>
    </button>
  );
};

GameButton.Icon = Icon;
GameButton.IconPick = IconPick;
GameButton.IconPickFlip = IconPickFlip;

export default GameButton;
