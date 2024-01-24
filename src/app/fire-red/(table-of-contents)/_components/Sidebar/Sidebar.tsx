import { Text } from '@/app/fire-red/_components';
import { Stack } from '@mantine/core';
import classes from './Sidebar.module.css';
import { POKEDEX_RANGES } from '@/config';

const Sidebar = () => {
  return (
    <div className={classes.root}>
      <Stack>
        <div>
          <Text className={classes.text}>Seen:</Text>
          <ul className={classes.list}>
            <li>
              <Text>KANTO</Text>
              <Text variant='orange'>{POKEDEX_RANGES.kanto.max}</Text>
            </li>
            <li>
              <Text>NATIONAL</Text>
              <Text variant='orange'>{POKEDEX_RANGES.fireRedNational.max}</Text>
            </li>
          </ul>
        </div>
      </Stack>
    </div>
  );
};
export default Sidebar;
