import Navbar from './_components/Navbar/Navbar';
import Text from './_components/Text/Text';
import './theme.css';
import classes from './layout.module.css';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={classes.root}>
      <Navbar align='center' justify='space-around'>
        <Text variant='white' fz={40}>
          POKéDEX
        </Text>
        <Text variant='white' fz={40}>
          TABLE OF CONTENTS
        </Text>
      </Navbar>
      <div className={classes.main}>{children}</div>
      <Navbar align='end' justify='end'>
        <Text variant='white' fz={30}>
          Button
        </Text>
      </Navbar>
    </div>
  );
};

export default Layout;
