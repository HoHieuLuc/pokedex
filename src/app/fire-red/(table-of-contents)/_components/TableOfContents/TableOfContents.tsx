'use client';

import { Carousel } from '@mantine/carousel';
import tableOfContents, { TableOfContent } from './table-of-contents';
import TableOfContentsItem from './TableOfContentsItem';
import { useGameHotkeys, useItemPicker, useSelectedIndex } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ItemPicker } from '@/app/fire-red/_components';
import { useEffect, useMemo } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const TableOfContents = () => {
  const { initialIndex, setSelectedIndex } = useSelectedIndex({
    key: 'fire-red-toc',
    defaultValue: 1,
  });

  const router = useRouter();
  const items = useMemo(
    () =>
      tableOfContents.map((item) => ({
        disabled: item.type === 'heading',
        ...item,
      })),
    [],
  );

  const { setEmbla, selectedIndex, selectedItem } = useItemPicker({
    initialIndex: initialIndex,
    edges: 3,
    stepsToSkip: 0,
    items,
  });

  useGameHotkeys({
    A: () => router.push(`/fire-red/${selectedItem.href}`),
  });

  useEffect(() => {
    setSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  const handleClick = (item: TableOfContent, index: number) => {
    if (item.type === 'heading') {
      return;
    }
    setSelectedIndex(index);
    router.push(`/fire-red/${item.href}`);
  };

  const slides = tableOfContents.map((item, index) => (
    <Carousel.Slide key={index} onClick={() => handleClick(item, index)}>
      <TableOfContentsItem active={selectedIndex === index} {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <ItemPicker getEmblaApi={setEmbla} initialSlide={initialIndex - 3}>
        {slides}
      </ItemPicker>
      <Sidebar />
    </>
  );
};

export default TableOfContents;
