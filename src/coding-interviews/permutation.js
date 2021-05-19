
/**
 * 字符串的排列
 * 字符串的全排列。可以引申到 排列组合
 * @link https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/
 */

/**
 * 递归
 * @param {String} s 字符串
 */
// 1. 第一步
var permutation = function (s) {
  // 字符串转化为数组
  let c = s.split('');
  let res = []
  let len = s.length
  dfs(0)
  return res
  /**
   *
   * @param {*} x 固定位置的索引
   */
  function dfs(x) {
    if (x == len) {
      res.push(c.join(''))
      return
    }
    let st = new Set();
    for (let i = x; i < len; i++) {
      if (st.has(c[i])) {
        continue
      }
      swap(c, i, x)
      dfs(x + 1)
      swap(c, i, x)
    }
  }

  function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

}


// test:
let res = permutation('abc')
console.log(res)
