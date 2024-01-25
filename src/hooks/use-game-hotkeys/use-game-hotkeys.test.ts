import { renderHook, userEvent } from '@/test-utils';
import useGameHotkeys from './use-game-hotkeys';

const getDefaultValue = () => ({
  A: jest.fn(),
  B: jest.fn(),
  ArrowLeft: jest.fn(),
  ArrowRight: jest.fn(),
  ArrowUp: jest.fn(),
  ArrowDown: jest.fn(),
});

describe('hooks/use-game-hotkeys', () => {
  it('should work correctly', async () => {
    const defaultValue = getDefaultValue();

    renderHook(() => useGameHotkeys(defaultValue));

    await userEvent.keyboard('{Z}');
    await userEvent.keyboard('{X}');
    await userEvent.keyboard('{ArrowLeft}');
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowUp}');
    await userEvent.keyboard('{ArrowDown}');

    Object.keys(defaultValue).forEach((key) => {
      expect(defaultValue[key as keyof typeof defaultValue]).toHaveBeenCalledTimes(1);
    });
  });
});
