interface ToDictionaryProps<T, V> {
  data: Array<T>;
  key: (item: T) => string;
  value: (item: T) => V;
}

const toDictionary = <T, V>({ data, key, value }: ToDictionaryProps<T, V>) => {
  return data.reduce(
    (acc, item) => {
      const _key = key(item);
      const _value = value(item);
      acc[_key] = _value;
      return acc;
    },
    {} as Record<string, V>,
  );
};

export default toDictionary;
