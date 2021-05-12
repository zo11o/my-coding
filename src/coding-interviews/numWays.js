/**
 * 青蛙跳台阶问题
 * 题目：
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
 * 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 * @type 动态规划
 * @link https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/
 */


/**
 * 动态规划
 * @param {*} n
 * @returns
 */
var numWays = function (n) {
  if (n == 0 || n == 1) {
    return 1
  }
  if (n == 2) {
    return 2
  }
  let cur = 2, prev = 1;
  let sum
  for (let i = 3; i <= n; i++) {
    sum = (cur + prev) % 1000000007;
    prev = cur
    cur = sum
  }
  return sum
};
