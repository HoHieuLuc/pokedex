import { Navbar, Text } from '../_components';
import '../theme.css';
import classes from './layout.module.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='root'>
      <Navbar align='center' justify='space-around'>
        <Text variant='white' className={classes.title}>
          POKéDEX 1
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
    </div>
  );
};

export default Layout;
