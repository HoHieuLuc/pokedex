import { ReactQuerySuspense } from '@/components';
import { Layout, Navbar, Text } from '../_components';
import { USE_SELECTED_INDEX_QUERY_KEYS } from '@/hooks/use-selected-index/use-selected-index';
import { BottomNav } from '../[dex]/_components';

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Navbar align='center' justify='center'>
        <Text variant='white' fz={50}>
          SEARCH
        </Text>
      </Navbar>
      <div className='main'>
        <ReactQuerySuspense queryKey={USE_SELECTED_INDEX_QUERY_KEYS.selections}>
          {children}
        </ReactQuerySuspense>
      </div>
      <BottomNav />
    </Layout>
  );
};

export default PageLayout;
