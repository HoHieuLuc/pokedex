import { render, renderHook, userEvent } from '@/test-utils';
import useItemPicker, { UseItemPickerProps } from './use-item-picker';
import { Carousel, CarouselProps } from '@mantine/carousel';

describe('fire-red/hooks/use-item-picker', () => {
  const items = [false, false, false, false, true, true, false, false, false, false].map(
    (item) => ({
      disabled: item,
    }),
  );
  const slides = items.map((item, index) => <Carousel.Slide key={index} />);

  const defaultCarouselProps: CarouselProps = {
    orientation: 'vertical',
    containScroll: 'trimSnaps',
    withKeyboardEvents: false,
  };

  const defaultHookProps: UseItemPickerProps<{ disabled: boolean }> = {
    items,
    initialIndex: 0,
    edges: 3,
    throttleDelay: 0,
    stepsToSkip: 3,
  };

  const setUpTest = (props = defaultHookProps) => {
    const view = renderHook(() => useItemPicker(props));

    render(
      <Carousel {...defaultCarouselProps} getEmblaApi={view.result.current.setEmbla}>
        {slides}
      </Carousel>,
    );

    return view;
  };

  it('should set the initial index correctly', () => {
    const { result } = setUpTest({ ...defaultHookProps, initialIndex: 2 });

    expect(result.current.selectedIndex).toBe(2);
  });

  it('should increment the index when arrow down is pressed', async () => {
    const { result } = setUpTest();

    await userEvent.keyboard('{ArrowDown}');

    expect(result.current.selectedIndex).toBe(defaultHookProps.initialIndex + 1);
  });

  it('should decrement the index when arrow up is pressed', async () => {
    const { result } = setUpTest({ ...defaultHookProps, initialIndex: 3 });

    await userEvent.keyboard('{ArrowUp}');

    expect(result.current.selectedIndex).toBe(2);
  });

  it('should not decrement the index when arrow up is pressed and there is no previous non-disabled item', async () => {
    const { result } = setUpTest();

    await userEvent.keyboard('{ArrowUp}');

    expect(result.current.selectedIndex).toBe(0);
  });

  it('should not increment the index when arrow down is pressed and there is no next non-disabled item', async () => {
    const { result } = setUpTest({ ...defaultHookProps, initialIndex: items.length - 1 });

    await userEvent.keyboard('{ArrowDown}');

    expect(result.current.selectedIndex).toBe(items.length - 1);
  });

  it('should skip disabled items', async () => {
    const { result } = setUpTest({ ...defaultHookProps, initialIndex: 3 });

    await userEvent.keyboard('{ArrowDown}');
    expect(result.current.selectedIndex).toBe(6);

    await userEvent.keyboard('{ArrowUp}');
    expect(result.current.selectedIndex).toBe(3);

    await userEvent.keyboard('{ArrowDown}');
    expect(result.current.selectedIndex).toBe(6);

    await userEvent.keyboard('{ArrowUp}');
    expect(result.current.selectedIndex).toBe(3);
  });

  it(`should skip ${defaultHookProps.stepsToSkip} items`, async () => {
    const { result } = setUpTest({ ...defaultHookProps, initialIndex: 3 });

    await userEvent.keyboard('{ArrowRight}');
    expect(result.current.selectedIndex).toBe(6);

    await userEvent.keyboard('{ArrowLeft}');
    expect(result.current.selectedIndex).toBe(3);
  });

  it(`should return the last item when there are less than ${defaultHookProps.stepsToSkip} items`, async () => {
    const { result } = setUpTest({ ...defaultHookProps, initialIndex: items.length - 2 });

    await userEvent.keyboard('{ArrowRight}');

    expect(result.current.selectedIndex).toBe(items.length - 1);
  });

  it(`should return the first item when there are less than ${defaultHookProps.stepsToSkip} items`, async () => {
    const { result } = setUpTest({ ...defaultHookProps, initialIndex: 2 });

    await userEvent.keyboard('{ArrowLeft}');

    expect(result.current.selectedIndex).toBe(0);
  });
});
