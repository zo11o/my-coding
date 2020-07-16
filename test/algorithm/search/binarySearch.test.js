import binarySearch from '../../../src/algorithm/search/binarySearch'

test('binarySearch []', () => {
    expect(binarySearch([])).toStrictEqual(-1);
})

test('binarySearch([-1,0,3,5,9,12], 9)', () => {
  expect(binarySearch([-1,0,3,5,9,12], 9)).toStrictEqual(4);
})
