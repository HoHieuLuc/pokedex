import { POKEMON_TYPES } from '@/config';
import TypeBadge from './TypeBadge';
import { Group } from '@mantine/core';

export default { title: 'Fire Red/TypeBadge' };

const types = POKEMON_TYPES.filter((type) => type !== 'fairy');

export const All = () => {
  return (
    <Group>
      {types.map((type) => (
        <TypeBadge key={type} type={type} />
      ))}
    </Group>
  );
};
