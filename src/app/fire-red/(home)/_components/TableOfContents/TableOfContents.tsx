'use client';

import { Carousel } from '@mantine/carousel';
import tableOfContents from './table-of-contents';
import TableOfContentsItem from './TableOfContentsItem';
import { useItemPicker } from '@/app/fire-red/_hooks';

const TableOfContents = () => {
  const { setEmbla, selectedIndex } = useItemPicker({
    items: tableOfContents.map((item) => ({
      disabled: item.type === 'heading',
    })),
    initialIndex: 1,
    edges: 3,
  });

  const slides = tableOfContents.map((item, index) => (
    <Carousel.Slide key={index}>
      <TableOfContentsItem active={selectedIndex === index} {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      orientation='vertical'
      containScroll='trimSnaps'
      height='var(--fire-red-main-height)'
      align='start'
      // slideSize='fit-content'
      slideSize='calc(100% / 9)'
      getEmblaApi={setEmbla}
      withKeyboardEvents={false}
      withControls={false}
      draggable={false}
      speed={Infinity}
    >
      {slides}
    </Carousel>
  );
};

export default TableOfContents;
