import { POKEMON } from '@/config';
import { Navbar, Text } from '../_components';
import '../theme.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='root'>
      <Navbar align='center' justify='center'>
        <Text variant='white' fz={50}>
          {POKEMON} LIST
        </Text>
      </Navbar>
      <div className='main'>{children}</div>
      <Navbar align='end' justify='end'>
        <Text variant='white' fz={30}>
          Button
        </Text>
      </Navbar>
    </div>
  );
};

export default Layout;
