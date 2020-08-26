import letterCombinations from '../../../src/algorithm/bfs-dfs/letter-combinations'

test(`letterCombinations('2')`, function () {
  expect(letterCombinations('2')).toStrictEqual(['a', 'b', 'c']);
})

test(`letterCombinations('23')`, () => {
    expect(letterCombinations('23')).toStrictEqual([
      'ad', 'ae', 'af',
      'bd', 'be', 'bf',
      'cd', 'ce', 'cf'
    ]);
})

test(`letterCombinations('4524')`, () => {
  expect(letterCombinations('4524')).toStrictEqual([
    'gjag', 'gjah', 'gjai', 'gjbg', 'gjbh', 'gjbi',
    'gjcg', 'gjch', 'gjci', 'gkag', 'gkah', 'gkai',
    'gkbg', 'gkbh', 'gkbi', 'gkcg', 'gkch', 'gkci',
    'glag', 'glah', 'glai', 'glbg', 'glbh', 'glbi',
    'glcg', 'glch', 'glci', 'hjag', 'hjah', 'hjai',
    'hjbg', 'hjbh', 'hjbi', 'hjcg', 'hjch', 'hjci',
    'hkag', 'hkah', 'hkai', 'hkbg', 'hkbh', 'hkbi',
    'hkcg', 'hkch', 'hkci', 'hlag', 'hlah', 'hlai',
    'hlbg', 'hlbh', 'hlbi', 'hlcg', 'hlch', 'hlci',
    'ijag', 'ijah', 'ijai', 'ijbg', 'ijbh', 'ijbi',
    'ijcg', 'ijch', 'ijci', 'ikag', 'ikah', 'ikai',
    'ikbg', 'ikbh', 'ikbi', 'ikcg', 'ikch', 'ikci',
    'ilag', 'ilah', 'ilai', 'ilbg', 'ilbh', 'ilbi',
    'ilcg', 'ilch', 'ilci'
  ]);
})
