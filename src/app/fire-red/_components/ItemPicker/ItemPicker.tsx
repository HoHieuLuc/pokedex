import { Carousel, CarouselProps } from '@mantine/carousel';

const ItemPicker = (props: CarouselProps) => {
  return (
    <Carousel
      orientation='vertical'
      containScroll='trimSnaps'
      height='var(--fr-main-height)'
      align='start'
      slideSize='var(--fr-item-height)'
      withKeyboardEvents={false}
      withControls={false}
      speed={Infinity}
      dragFree
      {...props}
    />
  );
};
export default ItemPicker;
