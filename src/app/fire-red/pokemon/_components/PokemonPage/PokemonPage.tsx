'use client';

import fireRedHook from '@/app/fire-red/fire-red.hook';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useGameHotkeys, useNavigate, useSelectedIndex } from '@/hooks';
import { POKEDEX_RANGES } from '@/config';
import { useEffect } from 'react';
import PokemonArea from '../PokemonArea/PokemonArea';

interface Props {
  name: string;
}

const PokemonPage = ({ name }: Props) => {
  const navigate = useNavigate({ defaultValue: '/fire-red' });
  const tab = navigate.searchParams.get('tab');

  const { data, isLoading, next, previous } = fireRedHook.useByName(name);
  const isOpenedFromKantoDex = navigate.previousUrl === '/fire-red/kanto';

  const { setSelectedIndex } = useSelectedIndex({
    key: isOpenedFromKantoDex ? 'fire-red-kanto' : 'fire-red-national',
  });

  // update selected pokemon index from dex
  useEffect(() => {
    if (!data || navigate.previousUrl === '/fire-red') {
      return;
    }
    if (isOpenedFromKantoDex) {
      setSelectedIndex(data.pokedexNumbers['kanto'] - 1);
    } else {
      setSelectedIndex(data.pokedexNumbers['national'] - 1);
    }
  }, [data, navigate.previousUrl]);

  const handleArrows = (direction: 'next' | 'previous') => {
    if (isLoading) {
      return;
    }

    if (
      direction === 'next' &&
      next &&
      // prevent going out of national dex range
      next.species.pokedexNumbers['national'] <= POKEDEX_RANGES.fireRedNational.max
    ) {
      // prevent going out of kanto dex range
      if (isOpenedFromKantoDex && !next.species.pokedexNumbers['kanto']) {
        return;
      }
      navigate.push(`/fire-red/pokemon/${next.slug}`);
    }
    if (direction === 'previous' && previous) {
      navigate.push(`/fire-red/pokemon/${previous.slug}`);
    }
  };

  useGameHotkeys({
    A: () => {
      if (tab === 'area') {
        navigate.back();
      } else {
        navigate.setSearchParams({
          tab: 'area',
        });
      }
    },
    B: () => {
      if (tab === 'area') {
        navigate.setSearchParams({
          tab: undefined,
        });
      } else {
        navigate.back();
      }
    },
    ArrowUp: () => handleArrows('previous'),
    ArrowDown: () => handleArrows('next'),
  });

  if (isLoading || !data) {
    return <></>;
  }

  const sprite =
    data.sprites.versions['generation-iii']?.['firered-leafgreen']?.frontDefault ||
    data.sprites.versions['generation-iii']?.['emerald']?.frontDefault ||
    data.sprites.frontDefault;

  const icon =
    data.sprites.versions['generation-vii']?.['icons']?.frontDefault ||
    data.sprites.versions['generation-viii']?.['icons']?.frontDefault ||
    data.sprites.frontDefault;

  return (
    <>
      {tab === 'area' ? (
        <PokemonArea
          {...data}
          index={data.pokedexNumbers['national']}
          sprite={sprite}
          icon={icon}
        />
      ) : (
        <PokemonCard
          {...data}
          index={data.pokedexNumbers['national']}
          flavorText={data.flavorTexts['firered']}
          sprite={sprite}
        />
      )}
    </>
  );
};
export default PokemonPage;
