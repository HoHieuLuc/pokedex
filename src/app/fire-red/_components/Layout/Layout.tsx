import { Box, BoxProps } from '@mantine/core';
import '../../theme.css';

interface Props extends BoxProps {
  children: React.ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  return (
    <Box {...props} className='root'>
      {children}
    </Box>
  );
};

export default Layout;
