import { throttle } from '@/utils';
import { Embla } from '@mantine/carousel';
import { useHotkeys } from '@mantine/hooks';
import { useCallback, useState } from 'react';
import useStateRef from '../use-state-ref/use-state-ref';

export interface UseItemPickerItem {
  disabled: boolean;
}

export interface UseItemPickerProps<T> {
  items: Array<T>;
  initialIndex: number;
  edges: number;
  throttleDelay?: number;
}

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

/**
 * Pick an item using arrow keys.
 * Use with embla carousel.
 */
const useItemPicker = <T extends UseItemPickerItem>({
  items,
  initialIndex,
  edges,
  throttleDelay = 100,
}: UseItemPickerProps<T>) => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [selectedIndex, setSelectedIndex, selectedIndexRef] = useStateRef(initialIndex);

  const handleArrowUp = useCallback(
    throttle(() => {
      const _selectedIndex = selectedIndexRef.current;
      if (!embla || items.length === 0) {
        return;
      }

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
      const _selectedIndex = selectedIndexRef.current;
      if (!embla || items.length === 0 || _selectedIndex === items.length - 1) {
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

  // TODO: implement mobile gesture
  useHotkeys([
    ['ArrowUp', handleArrowUp],
    ['ArrowDown', handleArrowDown],
  ]);

  return {
    embla,
    setEmbla,
    selectedItem: items[selectedIndex],
    selectedIndex: selectedIndex,
  };
};

export default useItemPicker;
