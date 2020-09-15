import subsets from '../../../src/algorithm/backtrack/subsets'

test(`subsets: []`, function () {
  expect(subsets([])).toStrictEqual([[]]);
})

test(`subsets: [1]`, function () {
  expect(subsets([1])).toStrictEqual([[], [1]]);
})

test(`subsets: [1, 2]`, function () {
  expect(subsets([1, 2])).toStrictEqual([[], [1], [1, 2],[2]]);
})
