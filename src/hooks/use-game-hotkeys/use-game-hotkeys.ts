import { useHotkeys, useLocalStorage } from '@mantine/hooks';

interface GameHotkeys {
  A: string;
  B: string;
  ArrowLeft: string;
  ArrowRight: string;
  ArrowUp: string;
  ArrowDown: string;
}

const defaultValue: GameHotkeys = {
  A: 'Z',
  B: 'X',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
};

type UseGameHotkeysProps = {
  [key in keyof GameHotkeys]?: () => void;
};

const useGameHotkeys = (props: UseGameHotkeysProps) => {
  const [hotkeys] = useLocalStorage({
    key: 'game-hotkeys',
    defaultValue,
    serialize(value) {
      try {
        return JSON.stringify(value);
      } catch {
        return JSON.stringify(defaultValue);
      }
    },
    deserialize(value) {
      if (!value) {
        return defaultValue;
      }
      try {
        return JSON.parse(value) as GameHotkeys;
      } catch {
        return defaultValue;
      }
    },
  });

  useHotkeys(
    Object.keys(props).map((key) => {
      const _key = hotkeys[key as keyof GameHotkeys];
      const _callback = props[key as keyof GameHotkeys] as () => void;

      return [_key, _callback];
    }),
  );
};

export default useGameHotkeys;
