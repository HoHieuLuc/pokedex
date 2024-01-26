import { useLocalStorage } from '@mantine/hooks';

interface UseJsonLocalStorageProps<T> {
  key: string;
  defaultValue: T;
  getInitialValueInEffect?: boolean;
}

const useJsonLocalStorage = <T>({ defaultValue, ...props }: UseJsonLocalStorageProps<T>) => {
  return useLocalStorage({
    ...props,
    defaultValue,
    serialize(value) {
      try {
        return JSON.stringify(value);
      } catch {
        return JSON.stringify(defaultValue);
      }
    },
    deserialize: (value) => {
      if (!value) {
        return defaultValue;
      }
      try {
        return JSON.parse(value) as T;
      } catch {
        return defaultValue;
      }
    },
  });
};

export default useJsonLocalStorage;
