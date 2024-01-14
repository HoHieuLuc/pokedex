import { Group, GroupProps } from '@mantine/core';
import classes from './Navbar.module.css';

interface Props extends GroupProps {
  children: React.ReactNode;
}

const Navbar = ({ children, ...props }: Props) => {
  return (
    <Group {...props} className={classes.root}>
      {children}
    </Group>
  );
};

export default Navbar;
