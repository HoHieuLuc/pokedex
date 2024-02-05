import { useHotkeys } from '@mantine/hooks';
import useJsonLocalStorage from '../use-json-local-storage/use-json-local-storage';

interface GameHotkeys {
  A: string;
  B: string;
  ArrowLeft: string;
  ArrowRight: string;
  ArrowUp: string;
  ArrowDown: string;
  Start: string;
}

const defaultValue: GameHotkeys = {
  A: 'Z',
  B: 'X',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Start: 'Enter',
};

type UseGameHotkeysProps = {
  [key in keyof GameHotkeys]?: () => void;
};

const useGameHotkeys = (props: UseGameHotkeysProps) => {
  const [hotkeys] = useJsonLocalStorage({
    key: 'game-hotkeys',
    defaultValue,
  });

  useHotkeys(
    Object.keys(props).map((key) => {
      const _key = hotkeys[key as keyof GameHotkeys];
      const _callback = props[key as keyof GameHotkeys] as () => void;

      return [_key, _callback];
    }),
  );

  return hotkeys;
};

export default useGameHotkeys;
