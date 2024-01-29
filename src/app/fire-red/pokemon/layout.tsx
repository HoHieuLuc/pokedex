import { POKEMON } from '@/config';
import { Layout, Navbar, Text } from '../_components';
import { BottomNav } from './_components';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Navbar align='center' justify='center'>
        <Text variant='white' fz='var(--fr-fz-lg)'>
          {POKEMON} LIST
        </Text>
      </Navbar>
      <div className='main' data-variant='details'>
        <div className='container'>{children}</div>
      </div>
      <Navbar align='end' justify='end'>
        <BottomNav />
      </Navbar>
    </Layout>
  );
};

export default PageLayout;
