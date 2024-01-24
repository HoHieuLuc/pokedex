'use client';

import { Carousel } from '@mantine/carousel';
import tableOfContents from './table-of-contents';
import TableOfContentsItem from './TableOfContentsItem';
import { useItemPicker, useSelectedIndex } from '@/hooks';
import { useHotkeys } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { ItemPicker } from '@/app/fire-red/_components';
import { useEffect, useMemo } from 'react';

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
    throttleDelay: 0,
    stepsToSkip: 0,
    items,
  });

  useHotkeys([['Z', () => router.push(`/fire-red/${selectedItem.href}`)]]);

  useEffect(() => {
    setSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  const slides = tableOfContents.map((item, index) => (
    <Carousel.Slide key={index}>
      <TableOfContentsItem active={selectedIndex === index} {...item} />
    </Carousel.Slide>
  ));

  return (
    <ItemPicker getEmblaApi={setEmbla} initialSlide={initialIndex - 3}>
      {slides}
    </ItemPicker>
  );
};

export default TableOfContents;
