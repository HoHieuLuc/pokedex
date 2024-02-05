import { PokemonHabitat } from '@/pokemon';
import { Layout } from '../../_components';
import classes from './layout.module.css';
import clsx from 'clsx';
import { BottomNav, TopNav, TopNavFallback } from '../_components';
import { Suspense } from 'react';

interface Props {
  children: React.ReactNode;
  params: {
    habitat: PokemonHabitat;
  };
}

const PageLayout = ({ children, params }: Props) => {
  return (
    <Layout>
      <Suspense fallback={<TopNavFallback habitat={params.habitat} />}>
        <TopNav habitat={params.habitat} />
      </Suspense>
      <div className='main' data-variant='details'>
        <div className={clsx('container', classes.container)}>{children}</div>
      </div>
      <Suspense>
        <BottomNav />
      </Suspense>
    </Layout>
  );
};

export default PageLayout;
