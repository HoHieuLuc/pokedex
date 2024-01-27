import { POKEMON } from '@/config';
import { Layout, Navbar, Text } from '../_components';
import { ReactQuerySuspense } from '@/components';
import { USE_SELECTED_INDEX_QUERY_KEYS } from '@/hooks/use-selected-index/use-selected-index';

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
      <div className='main'>
        <ReactQuerySuspense queryKey={USE_SELECTED_INDEX_QUERY_KEYS.selections}>
          {children}
        </ReactQuerySuspense>
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
