import { PokemonHabitat } from '@/pokemon';
import { Layout, Navbar, Text } from '../../_components';
import { POKEMON_HABITATS, POKEMON } from '@/config';
import classes from './layout.module.css';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  params: {
    habitat: PokemonHabitat;
  };
}

const PageLayout = ({ children, params }: Props) => {
  return (
    <Layout>
      <Navbar align='center' justify='center'>
        <Text variant='white' fz='var(--fr-fz-lg)'>
          {POKEMON_HABITATS[params.habitat]} {POKEMON}
        </Text>
      </Navbar>
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
