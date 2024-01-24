'use client';

import fireRedHook from '@/app/fire-red/fire-red.hook';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useHotkeys } from '@mantine/hooks';
import { useNavigate, useSelectedIndex } from '@/hooks';
import { POKEDEX_RANGES } from '@/config';
import { useEffect } from 'react';

interface Props {
  name: string;
}

const PokemonPage = ({ name }: Props) => {
  const navigate = useNavigate({ defaultValue: '/fire-red' });
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

  useHotkeys([
    ['X', navigate.back],
    ['ArrowUp', () => handleArrows('previous')],
    ['ArrowDown', () => handleArrows('next')],
  ]);

  if (isLoading || !data) {
    return <></>;
  }

  return (
    <>
      <PokemonCard
        {...data}
        index={data.pokedexNumbers['national']}
        flavorText={data.flavorTexts['firered']}
        sprite={
          data.sprites.versions['generation-iii']?.['firered-leafgreen'].frontDefault ||
          data.sprites.versions['generation-iii']?.['emerald'].frontDefault ||
          data.sprites.frontDefault
        }
      />
    </>
  );
};
export default PokemonPage;
