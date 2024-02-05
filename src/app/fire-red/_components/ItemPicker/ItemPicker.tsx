import { Carousel, CarouselProps } from '@mantine/carousel';
import classes from './ItemPicker.module.css';

const ItemPicker = ({ classNames, ...props }: CarouselProps) => {
  return (
    <Carousel
      orientation='vertical'
      containScroll='trimSnaps'
      height='var(--fr-main-height)'
      align='start'
      slideSize='var(--fr-item-height)'
      withKeyboardEvents={false}
      speed={Infinity}
      dragFree
      {...props}
      classNames={{
        ...classNames,
        control: classes.control,
        controls: classes.controls,
      }}
    />
  );
};
export default ItemPicker;
