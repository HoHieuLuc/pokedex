import { Carousel, CarouselProps } from '@mantine/carousel';

const ItemPicker = (props: CarouselProps) => {
  return (
    <Carousel
      orientation='vertical'
      containScroll='trimSnaps'
      height='var(--fire-red-main-height)'
      align='start'
      // slideSize='fit-content'
      slideSize='calc(100% / 9)'
      withKeyboardEvents={false}
      withControls={false}
      draggable={false}
      speed={Infinity}
      {...props}
    />
  );
};
export default ItemPicker;
