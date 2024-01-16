import { Group, GroupProps } from '@mantine/core';
import clsx from 'clsx';
import classes from './Navbar.module.css';

interface Props extends GroupProps {
  children: React.ReactNode;
}

const Navbar = ({ children, ...props }: Props) => {
  return (
    <Group {...props} className={clsx(classes.root, props.className)}>
      {children}
    </Group>
  );
};

export default Navbar;
