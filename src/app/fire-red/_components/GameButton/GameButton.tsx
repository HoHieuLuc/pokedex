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

interface GameButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  label: string;
  icon: React.ReactNode;
}

const GameButton = ({ label, icon, ...props }: GameButtonProps) => {
  return (
    <button className={classes.root} {...props}>
      {icon}
      <Text variant='white' fz='var(--fr-fz-md)'>
        {label}
      </Text>
    </button>
  );
};

GameButton.Icon = Icon;
GameButton.IconPick = IconPick;

export default GameButton;
