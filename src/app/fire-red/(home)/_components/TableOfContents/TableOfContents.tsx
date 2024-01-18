'use client';

import { Carousel } from '@mantine/carousel';
import tableOfContents from './table-of-contents';
import TableOfContentsItem from './TableOfContentsItem';
import { useItemPicker } from '@/hooks';
import { useHotkeys } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { ItemPicker } from '@/app/fire-red/_components';
import { useMemo } from 'react';

const TableOfContents = () => {
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
    initialIndex: 1,
    edges: 3,
    items,
    throttleDelay: 0,
    stepsToSkip: 0,
  });

  useHotkeys([['Z', () => router.push(`/fire-red/${selectedItem.href}`)]]);

  const slides = tableOfContents.map((item, index) => (
    <Carousel.Slide key={index}>
      <TableOfContentsItem active={selectedIndex === index} {...item} />
    </Carousel.Slide>
  ));

  return <ItemPicker getEmblaApi={setEmbla}>{slides}</ItemPicker>;
};

export default TableOfContents;
