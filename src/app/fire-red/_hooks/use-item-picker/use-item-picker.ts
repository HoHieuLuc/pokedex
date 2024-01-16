import { Embla } from '@mantine/carousel';
import { useHotkeys } from '@mantine/hooks';
import { useState } from 'react';

export interface UseItemPickerItem {
  disabled: boolean;
}

export interface UseItemPickerProps<T> {
  items: Array<T>;
  initialIndex: number;
  edges: number;
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
const useItemPicker = <T extends UseItemPickerItem>({ items, initialIndex, edges }: UseItemPickerProps<T>) => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const handleArrowUp = () => {
    if (!embla) {
      return;
    }

    const nextActiveIndex = findPreviousNonDisabledItemIndex(items, selectedIndex);
    if (nextActiveIndex === -1) {
      return;
    }

    const [firstItemIndex] = embla.slidesInView();
    // show the first [edges] items when scrolling up
    if (selectedIndex - firstItemIndex <= edges) {
      embla.scrollTo(nextActiveIndex - edges, true);
    }

    setSelectedIndex(nextActiveIndex);
  };

  const handleArrowDown = () => {
    if (!embla || selectedIndex === items.length - 1) {
      return;
    }

    const nextActiveIndex = findNextNonDisabledItemIndex(items, selectedIndex);
    if (nextActiveIndex === -1) {
      return;
    }

    const slidesInView = embla.slidesInView();
    const lastItemIndex = slidesInView[slidesInView.length - 1];
    // show the last [edges] items when scrolling down
    if (lastItemIndex - selectedIndex <= edges) {
      embla.scrollTo(nextActiveIndex + edges + 1 - slidesInView.length);
    }
    setSelectedIndex(nextActiveIndex);
  };

  // TODO: implement mobile gesture
  useHotkeys([
    ['ArrowDown', handleArrowDown],
    ['ArrowUp', handleArrowUp],
  ]);

  return {
    embla,
    setEmbla,
    selectedItem: items[selectedIndex],
    selectedIndex,
  };
};

export default useItemPicker;
