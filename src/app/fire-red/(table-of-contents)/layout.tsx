import { ReactQuerySuspense } from '@/components';
import { Layout, Navbar, Text } from '../_components';
import classes from './layout.module.css';
import { USE_SELECTED_INDEX_QUERY_KEYS } from '@/hooks/use-selected-index/use-selected-index';
import { BottomNav } from './_components';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Navbar align='center' justify='center' className={classes['navbar-wrapper']}>
        <Text variant='white' className={classes.title}>
          POKéDEX
        </Text>
        <Text variant='white' className={classes.title}>
          TABLE OF CONTENTS
        </Text>
      </Navbar>
      <div className='main'>
        <div className='container'>
          <ReactQuerySuspense queryKey={USE_SELECTED_INDEX_QUERY_KEYS.selections}>
            {children}
          </ReactQuerySuspense>
        </div>
      </div>
      <Navbar align='end' justify='end'>
        <BottomNav />
      </Navbar>
    </Layout>
  );
};

export default PageLayout;
