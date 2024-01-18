'use client';

import fireRedHook from '@/app/fire-red/fire-red.hook';
import PokemonListItem from './PokemonListItem';
import { Flex } from '@mantine/core';
import { ItemPicker } from '@/app/fire-red/_components';
import { Carousel } from '@mantine/carousel';
import { useItemPicker } from '@/hooks';
import { useMemo } from 'react';
import { useHotkeys } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

interface Props {
  dex: 'kanto' | 'national';
}

const PokemonList = ({ dex }: Props) => {
  const router = useRouter();
  const { data, isLoading } = fireRedHook.useDex(dex);

  const items = useMemo(() => data?.map(() => ({ disabled: false })), [data]);
  const { setEmbla, selectedIndex } = useItemPicker({
    items: items || [],
    edges: 3,
    initialIndex: 0,
  });

  useHotkeys([['X', () => router.push('.')]]);

  if (isLoading) {
    return <></>;
  }

  const pokemonItems = data?.map((pokemon, index) => (
    <Carousel.Slide key={pokemon.id}>
      <PokemonListItem {...pokemon} active={index === selectedIndex} />
    </Carousel.Slide>
  ));

  return (
    <Flex justify='center' py='xs' mx='lg'>
      <ItemPicker getEmblaApi={setEmbla} miw={800}>
        {pokemonItems}
      </ItemPicker>
    </Flex>
  );
};

export default PokemonList;
