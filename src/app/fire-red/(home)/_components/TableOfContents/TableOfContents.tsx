'use client';

import { Carousel } from '@mantine/carousel';
import tableOfContents from './table-of-contents';
import TableOfContentsItem from './TableOfContentsItem';
import { useItemPicker } from '@/app/fire-red/_hooks';
import { useHotkeys } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { ItemPicker } from '@/app/fire-red/_components';

const TableOfContents = () => {
  const router = useRouter();
  const { setEmbla, selectedIndex, selectedItem } = useItemPicker({
    items: tableOfContents.map((item) => ({
      disabled: item.type === 'heading',
      ...item,
    })),
    initialIndex: 1,
    edges: 3,
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
