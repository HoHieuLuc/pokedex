import toChunks from './to-chunks';

it('should split an array into chunks of the specified size', () => {
  const array = [1, 2, 3, 4, 5, 6, 7];
  const size = 2;
  const expectedChunks = [[1, 2], [3, 4], [5, 6], [7]];

  const result = toChunks(array, size);

  expect(result).toStrictEqual(expectedChunks);
});
