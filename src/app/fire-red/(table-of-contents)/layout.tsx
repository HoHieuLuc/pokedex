import { Layout, Navbar, Text } from '../_components';
import classes from './layout.module.css';

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
      <div className='main'>{children}</div>
      <Navbar align='end' justify='end'>
        <Text variant='white' fz={30}>
          Button
        </Text>
      </Navbar>
    </Layout>
  );
};

export default PageLayout;
