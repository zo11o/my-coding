import shellSort from '../../../src/algorithm/sort/shellSort'

test('shellSort arg []', () => {
    expect(shellSort([])).toStrictEqual([]);
})

test('shellSort arg [0]', () => {
    expect(shellSort([0])).toStrictEqual([0]);
})

test('shellSort arg [1]', () => {
    expect(shellSort([1])).toStrictEqual([1]);
})

test('shellSort [1,3,5,2,4]', () => {
    expect(shellSort([1,3,5,2,4])).toStrictEqual([1,2,3,4,5]);
})

test('shellSort [1,3,1,2,7,8,44,213,6,67854,1,43523,82,43,4562,11,4,7,123]', () => {
    expect(shellSort([1,3,1,2,7,8,44,213,6,67854,1,43523,82,43,4562,11,4,7,123])).toStrictEqual([1, 1, 1, 2, 3, 4, 6, 7, 7, 8, 11, 43, 44, 82, 123, 213, 4562, 43523, 67854]);
})
