const parseNumber = (value: unknown, defaultValue: number = 0) => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return Number(value) || defaultValue;
  }

  return defaultValue;
};

export default parseNumber;
