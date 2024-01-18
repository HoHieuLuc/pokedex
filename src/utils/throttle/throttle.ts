const throttle = (func: (...args: unknown[]) => unknown, delay: number) => {
  let timerFlag: NodeJS.Timeout | null = null;

  return (...args: unknown[]) => {
    if (timerFlag === null) {
      func(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
};

export default throttle;
