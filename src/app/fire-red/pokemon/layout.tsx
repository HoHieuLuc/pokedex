import { POKEMON } from '@/config';
import { Layout, Navbar, Text } from '../_components';
import { BottomNav, BottomNavFallback } from './_components';
import classes from './layout.module.css';
import clsx from 'clsx';
import { Suspense } from 'react';

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
        <div className={clsx('container', classes.container)}>{children}</div>
      </div>
      <Suspense fallback={<BottomNavFallback />}>
        <BottomNav />
      </Suspense>
    </Layout>
  );
};

export default PageLayout;
