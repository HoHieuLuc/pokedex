import { Text } from '@/app/fire-red/_components';
import { Stack } from '@mantine/core';
import classes from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={classes.root}>
      <Stack>
        <div>
          <Text className={classes.text}>Seen:</Text>
          <ul className={classes.list}>
            <li>
              <Text>KANTO</Text>
              <Text variant='orange'>151</Text>
            </li>
            <li>
              <Text>NATIONAL</Text>
              <Text variant='orange'>386</Text>
            </li>
          </ul>
        </div>
      </Stack>
    </div>
  );
};
export default Sidebar;
