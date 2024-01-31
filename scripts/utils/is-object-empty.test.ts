import isObjectEmpty from './is-object-empty';

describe('scripts/utils/is-object-empty', () => {
  it('should work correctly', () => {
    const obj1 = {
      a: {
        b: null,
        c: {
          d: null,
          e: null,
        },
      },
      f: null,
    };

    const obj2 = {};

    const obj3 = {
      a: {
        b: null,
      },
      c: 'aaa',
    };

    expect(isObjectEmpty(obj1)).toBe(true);
    expect(isObjectEmpty(obj2)).toBe(true);
    expect(isObjectEmpty(obj3)).toBe(false);
  });
});
