'use client';

import { Carousel, Embla } from '@mantine/carousel';
import { useHotkeys } from '@mantine/hooks';
import { useState } from 'react';
import tableOfContents from './table-of-contents';
import TableOfContentsItem from './TableOfContentsItem';

const TableOfContents = () => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [activeItem, setActiveItem] = useState(1);

  const handleArrowUp = () => {
    if (!embla || activeItem === 1) {
      return;
    }

    const isPrevItemHeading = tableOfContents[activeItem - 1].type === 'heading';
    const nextActiveItem = isPrevItemHeading ? activeItem - 2 : activeItem - 1;

    const [firstItemIndex] = embla.slidesInView();
    // show the first 3 items when scrolling up
    if (activeItem - firstItemIndex <= 3) {
      embla.scrollPrev();
      isPrevItemHeading && embla.scrollPrev();
    }

    setActiveItem(nextActiveItem);
  };

  const handleArrowDown = () => {
    if (!embla || activeItem === slides.length - 1) {
      return;
    }

    const isNextItemHeading = tableOfContents[activeItem + 1].type === 'heading';
    const nextActiveItem = isNextItemHeading ? activeItem + 2 : activeItem + 1;

    const slidesInView = embla.slidesInView();
    const lastItemIndex = slidesInView[slidesInView.length - 1];
    // show the last 3 items when scrolling down
    if (lastItemIndex - activeItem <= 3) {
      embla.scrollNext();
      isNextItemHeading && embla.scrollNext();
    }
    setActiveItem(nextActiveItem);
  };

  // TODO: implement mobile gesture
  useHotkeys([
    ['ArrowDown', handleArrowDown],
    ['ArrowUp', handleArrowUp],
  ]);

  const slides = tableOfContents.map((item, index) => (
    <Carousel.Slide key={index}>
      <TableOfContentsItem active={activeItem === index} {...item} />
    </Carousel.Slide>
  ));

  return (
    <div>
      <Carousel
        orientation='vertical'
        containScroll='trimSnaps'
        height='calc(100dvh - 6rem)'
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
    </div>
  );
};

export default TableOfContents;
