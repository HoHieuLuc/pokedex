import { Box, BoxProps } from '@mantine/core';
import classes from './PokemonAvatar.module.css';

interface Props extends BoxProps {
  pageLength: number;
  children: React.ReactNode;
}

const PokemonAvatarWrapper = ({ pageLength, children, ...props }: Props) => {
  return (
    <Box {...props} className={classes['root-wrapper']} data-page-length={pageLength}>
      {children}
    </Box>
  );
};
export default PokemonAvatarWrapper;
