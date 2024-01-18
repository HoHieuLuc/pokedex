import { useRef, useState } from 'react';

/**
 * Manage state with a ref.
 * Useful when using state in a useCallback without putting that state in the dependencies array.
 */
const useStateRef = <T>(inititalValue: T) => {
  const [value, setValue] = useState(inititalValue);
  const valueRef = useRef(inititalValue);

  const setState = (value: T) => {
    setValue(value);
    valueRef.current = value;
  };

  return [value, setState, valueRef] as const;
};

export default useStateRef;
