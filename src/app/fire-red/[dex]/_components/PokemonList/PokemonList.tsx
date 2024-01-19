'use client';

import PokemonListItem from './PokemonListItem';
import { Flex } from '@mantine/core';
import { ItemPicker } from '@/app/fire-red/_components';
import { Carousel } from '@mantine/carousel';
import { useItemPicker, useSelectedIndex } from '@/hooks';
import { useEffect, useMemo } from 'react';
import { Pokemon } from '@/pokemon';

interface Props {
  data: Pokemon<'firered'>[];
  dex: 'kanto' | 'national';
}

const PokemonList = ({ data, dex }: Props) => {
  const [initialIndex, setSelectedIndex] = useSelectedIndex({ key: `fire-red-${dex}`, defaultValue: 1 });

  const items = useMemo(() => data.map(() => ({ disabled: false })), [data]);
  const { setEmbla, selectedIndex } = useItemPicker({
    items: items || [],
    edges: 3,
    initialIndex: initialIndex,
  });

  useEffect(() => {
    setSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  const pokemonItems = data?.map((pokemon, index) => (
    <Carousel.Slide key={pokemon.id}>
      <PokemonListItem {...pokemon} active={index === selectedIndex} />
    </Carousel.Slide>
  ));

  return (
    <Flex justify='center' py='xs' mx='lg'>
      <ItemPicker getEmblaApi={setEmbla} miw={800} initialSlide={initialIndex - 3}>
        {pokemonItems}
      </ItemPicker>
    </Flex>
  );
};

export default PokemonList;
