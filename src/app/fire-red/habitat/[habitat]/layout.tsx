import { PokemonHabitat } from '@/pokemon';
import { Layout, Navbar } from '../../_components';
import classes from './layout.module.css';
import clsx from 'clsx';
import { TopNav } from '../_components';

interface Props {
  children: React.ReactNode;
  params: {
    habitat: PokemonHabitat;
  };
}

const PageLayout = ({ children, params }: Props) => {
  return (
    <Layout>
      <TopNav habitat={params.habitat} />
      <div className='main' data-variant='details'>
        <div className={clsx('container', classes.container)}>{children}</div>
      </div>
      <Navbar align='end' justify='end'>
        A
      </Navbar>
    </Layout>
  );
};

export default PageLayout;
