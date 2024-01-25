import { throttle } from '@/utils';
import { Embla } from '@mantine/carousel';
import { useCallback, useState } from 'react';
import useStateRef from '../use-state-ref/use-state-ref';
import useGameHotkeys from '../use-game-hotkeys/use-game-hotkeys';

function findPreviousNonDisabledItemIndex(items: Array<UseItemPickerItem>, currentIndex: number) {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (!items[i].disabled) {
      return i;
    }
  }
  return -1;
}

function findNextNonDisabledItemIndex(items: Array<UseItemPickerItem>, currentIndex: number) {
  for (let i = currentIndex + 1; i < items.length; i++) {
    if (!items[i].disabled) {
      return i;
    }
  }
  return -1;
}

export interface UseItemPickerItem {
  disabled: boolean;
}

export interface UseItemPickerProps<T> {
  /** Make sure items is memoized */
  items: Array<T>;
  initialIndex: number;
  edges: number;
  /** @default 100 */
  throttleDelay?: number;
  /** @default 9 */
  stepsToSkip?: number;
}

/**
 * Pick an item using arrow keys.
 * Use with embla carousel.
 */
const useItemPicker = <T extends UseItemPickerItem>({
  items,
  initialIndex,
  edges,
  throttleDelay = 100,
  stepsToSkip = 9,
}: UseItemPickerProps<T>) => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [selectedIndex, setSelectedIndex, selectedIndexRef] = useStateRef(initialIndex);

  const handleArrowUp = useCallback(
    throttle(() => {
      if (!embla || items.length === 0) {
        return;
      }

      const _selectedIndex = selectedIndexRef.current;

      const nextActiveIndex = findPreviousNonDisabledItemIndex(items, _selectedIndex);

      if (nextActiveIndex === -1) {
        return;
      }

      const [firstItemIndex] = embla.slidesInView();
      // show the first [edges] items when scrolling up
      if (_selectedIndex - firstItemIndex <= edges) {
        embla.scrollTo(nextActiveIndex - edges);
      }

      setSelectedIndex(nextActiveIndex);
    }, throttleDelay),
    [embla, items],
  );

  const handleArrowDown = useCallback(
    throttle(() => {
      if (!embla || items.length === 0) {
        return;
      }

      const _selectedIndex = selectedIndexRef.current;
      if (_selectedIndex === items.length - 1) {
        return;
      }

      const nextActiveIndex = findNextNonDisabledItemIndex(items, _selectedIndex);
      if (nextActiveIndex === -1) {
        return;
      }

      const slidesInView = embla.slidesInView();
      const lastItemIndex = slidesInView[slidesInView.length - 1];
      // show the last [edges] items when scrolling down
      if (lastItemIndex - _selectedIndex <= edges) {
        embla.scrollTo(nextActiveIndex + edges + 1 - slidesInView.length);
      }
      setSelectedIndex(nextActiveIndex);
    }, throttleDelay),
    [embla, items],
  );

  const handleArrowRight = useCallback(
    throttle(() => {
      if (!embla || items.length === 0 || stepsToSkip === 0) {
        return;
      }

      const _selectedIndex = selectedIndexRef.current;
      if (_selectedIndex === items.length - 1) {
        return;
      }

      // find next non disabled item index by skipping the next [stepsToSkip - 1] item
      const nextActiveIndex = findNextNonDisabledItemIndex(items, _selectedIndex + stepsToSkip - 1);
      // if the next item can not be found, then pick the last non disabled item
      if (nextActiveIndex === -1) {
        const lastNonDisabledItemIndex = findPreviousNonDisabledItemIndex(items, items.length);
        embla.scrollTo(items.length - stepsToSkip);
        setSelectedIndex(lastNonDisabledItemIndex);
        return;
      }

      const slidesInView = embla.slidesInView();
      const lastItemIndex = slidesInView[slidesInView.length - 1];
      // show the last [edges] items when scrolling down
      if (nextActiveIndex + edges >= lastItemIndex) {
        embla.scrollTo(nextActiveIndex + edges + 1 - slidesInView.length);
      }
      setSelectedIndex(nextActiveIndex);
    }, throttleDelay),
    [embla, items],
  );

  const handleArrowLeft = useCallback(
    throttle(() => {
      if (!embla || items.length === 0 || stepsToSkip === 0) {
        return;
      }
      const _selectedIndex = selectedIndexRef.current;

      // find previous non disabled item index by skipping the previous [stepsToSkip + 1] item
      const nextActiveIndex = findPreviousNonDisabledItemIndex(
        items,
        _selectedIndex - stepsToSkip + 1,
      );
      // if the next item can not be found, then pick the first non disabled item
      if (nextActiveIndex === -1) {
        const firstNonDisabledItemIndex = findNextNonDisabledItemIndex(items, -1);
        embla.scrollTo(firstNonDisabledItemIndex - edges);
        setSelectedIndex(firstNonDisabledItemIndex);
        return;
      }

      const [firstItemIndex] = embla.slidesInView();
      // show the first [edges] items when scrolling up
      // nextActiveIndex + edges >= lastItemIndex
      if (nextActiveIndex - edges <= firstItemIndex) {
        embla.scrollTo(nextActiveIndex - edges);
      }

      setSelectedIndex(nextActiveIndex);
    }, throttleDelay),
    [embla, items],
  );

  useGameHotkeys({
    ArrowUp: handleArrowUp,
    ArrowDown: handleArrowDown,
    ArrowLeft: handleArrowLeft,
    ArrowRight: handleArrowRight,
  });

  return {
    embla,
    setEmbla,
    selectedItem: items[selectedIndex],
    selectedIndex: selectedIndex,
  };
};

export default useItemPicker;
