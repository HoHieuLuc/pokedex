'use client';

import fireRedHook from '@/app/fire-red/fire-red.hook';
import { PokemonList } from '@/app/fire-red/pokemon/_components';
import { useGameHotkeys } from '@/hooks';
import { pokemonService } from '@/pokemon';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const PokemonSearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'a-to-z';

  const { data, isLoading } = fireRedHook.useDex('national');

  const sortedPokemons = useMemo(() => {
    if (!data) {
      return [];
    }
    return pokemonService.getSortedPokemons({
      pokemons: data,
      dex: 'national',
      sort: sort,
    });
  }, [data, sort]);

  useGameHotkeys({
    B: () => router.push('/fire-red'),
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <PokemonList
        data={sortedPokemons}
        dex='national'
        selectedIndexKey={`fire-red-search-${sort}`}
      />
    </div>
  );
};

export default PokemonSearchPage;
