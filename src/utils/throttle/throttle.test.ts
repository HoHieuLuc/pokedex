import throttle from './throttle';

describe('utils/throttle', () => {
  it('throttles a function', () => {
    const func = jest.fn();
    const throttledFunc = throttle(func, 10);

    throttledFunc();
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);
  });
});
