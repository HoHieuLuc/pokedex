import { POKEMON } from '@/config';
import { Layout, Navbar, Text } from '../_components';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Navbar align='center' justify='center'>
        <Text variant='white' fz={50}>
          {POKEMON} LIST
        </Text>
      </Navbar>
      <div className='main' data-variant='details'>
        {children}
      </div>
      <Navbar align='end' justify='end'>
        <Text variant='white' fz={30}>
          Button
        </Text>
      </Navbar>
    </Layout>
  );
};

export default PageLayout;
