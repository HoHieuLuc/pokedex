'use client';

import PokemonListItem from './PokemonListItem';
import { Flex } from '@mantine/core';
import { ItemPicker } from '@/app/fire-red/_components';
import { Carousel } from '@mantine/carousel';
import { useGameHotkeys, useItemPicker, useNavigate, useSelectedIndex } from '@/hooks';
import { useEffect, useMemo } from 'react';
import { Pokemon } from '@/pokemon';
import { FireRedDex } from '@/app/fire-red';

interface Props {
  data: Pokemon[];
  dex: FireRedDex;
  selectedIndexKey: string;
}

const PokemonList = ({ data, dex, selectedIndexKey }: Props) => {
  const navigate = useNavigate({ defaultValue: '/fire-red' });
  const { initialIndex, setSelectedIndex } = useSelectedIndex({
    key: selectedIndexKey,
  });

  const items = useMemo(() => data.map((item) => ({ disabled: false, ...item })), [data]);
  const { setEmbla, selectedIndex, selectedItem } = useItemPicker({
    items: items || [],
    edges: 3,
    initialIndex: initialIndex,
  });

  useEffect(() => {
    setSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  useGameHotkeys({
    A: () => navigate.navigate(`/fire-red/pokemon/${selectedItem.slug}`),
  });

  const handleClick = (item: Pokemon, index: number) => {
    setSelectedIndex(index);
    navigate.navigate(`/fire-red/pokemon/${item.slug}`);
  };

  const pokemonItems = data.map((pokemon, index) => (
    <Carousel.Slide key={pokemon.id} onClick={() => handleClick(pokemon, index)}>
      <PokemonListItem {...pokemon} active={index === selectedIndex} dex={dex} />
    </Carousel.Slide>
  ));

  return (
    <Flex justify='center'>
      <ItemPicker getEmblaApi={setEmbla} initialSlide={initialIndex - 3}>
        {pokemonItems}
      </ItemPicker>
    </Flex>
  );
};

export default PokemonList;
