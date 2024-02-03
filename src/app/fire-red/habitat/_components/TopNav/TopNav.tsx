'use client';

import { Navbar, Text } from '@/app/fire-red/_components';
import { POKEMON, POKEMON_HABITATS } from '@/config';
import { PokemonHabitat } from '@/pokemon';
import classes from './TopNav.module.css';
import { useSearchParams } from 'next/navigation';
import { parseNumber } from '@/utils';
import { habitats } from '../../[habitat]/habitats';

interface Props {
  habitat: PokemonHabitat;
}

const TopNav = ({ habitat }: Props) => {
  const searchParams = useSearchParams();
  const currentHabitats = habitats[habitat];

  const getPage = () => {
    const _page = parseNumber(searchParams.get('page'));
    if (_page < 1) {
      return 1;
    }
    if (_page > currentHabitats.length) {
      return currentHabitats.length;
    }
    return _page;
  };

  const page = getPage();

  return (
    <Navbar className={classes.root} align='center' justify='space-between'>
      <Text variant='white' fz='var(--fr-fz-lg)'>
        {POKEMON_HABITATS[habitat]} {POKEMON}
      </Text>
      <Text className={classes.page} variant='white' fz='var(--fr-fz-lg)'>
        <span>Page</span> {page}/{currentHabitats.length}
      </Text>
    </Navbar>
  );
};
export default TopNav;
