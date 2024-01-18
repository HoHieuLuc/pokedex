import { Carousel, CarouselProps } from '@mantine/carousel';

const ItemPicker = (props: CarouselProps) => {
  return (
    <Carousel
      orientation='vertical'
      containScroll='trimSnaps'
      height='var(--fr-main-height)'
      align='start'
      slideSize={60}
      withKeyboardEvents={false}
      withControls={false}
      draggable={false}
      speed={Infinity}
      {...props}
    />
  );
};
export default ItemPicker;
