// 剑指 Offer 15. 二进制中1的个数

/**
 * 思路一： 使用 n & 1 去掉 0
 * @param {*} n
 * @returns
 */
function hammingWeight(n) {
  let count = 0
  while (n > 0) {
    count += n & 1
    n >>>= 1
  }

  return count
}


/**
 * 思路二： 使用 n = n&n-1
 */
function hammingWeight(n) {
  let count = 0

  while (n) {
    count += 1
    n &= n - 1
  }
  return count
}
