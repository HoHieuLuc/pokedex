'use client';

import PokemonListItem from './PokemonListItem';
import { Flex } from '@mantine/core';
import { ItemPicker } from '@/app/fire-red/_components';
import { Carousel } from '@mantine/carousel';
import { useItemPicker, useSelectedIndex } from '@/hooks';
import { useEffect, useMemo } from 'react';
import { Pokemon } from '@/pokemon';
import { FireRedDex } from '@/app/fire-red';

interface Props {
  data: Pokemon[];
  dex: FireRedDex;
}

const PokemonList = ({ data, dex }: Props) => {
  const [initialIndex, setSelectedIndex] = useSelectedIndex({
    key: `fire-red-${dex}`,
  });

  const items = useMemo(() => data.map(() => ({ disabled: false })), [data]);
  const { setEmbla, selectedIndex } = useItemPicker({
    items: items || [],
    edges: 3,
    initialIndex: initialIndex,
  });

  useEffect(() => {
    setSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  const pokemonItems = data.map((pokemon, index) => (
    <Carousel.Slide key={pokemon.id}>
      <PokemonListItem {...pokemon} active={index === selectedIndex} dex={dex} />
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
