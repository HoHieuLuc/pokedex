import toDictionary from './to-dictionary';

describe('utils/to-dictionary', () => {
  it('should convert an array of objects to a dictionary', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];

    const expectedDictionary = {
      John: { id: 1, name: 'John' },
      Jane: { id: 2, name: 'Jane' },
    };

    const dictionary = toDictionary({
      data: array,
      key: (item) => item.name,
      value: (item) => item,
    });

    expect(dictionary).toStrictEqual(expectedDictionary);
  });
});
