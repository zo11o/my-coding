// 本文讲述 位运算 最基础题 找缺失数字


/*
  https://leetcode-cn.com/problems/missing-number/
  缺失数字
  给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，
  找出 0 .. n 中没有出现在序列中的那个数。

  输入: [3,0,1]
  输出: 2

  输入: [9,6,4,2,3,5,7,0,1]
  输出: 8
*/


function missingNumber = function (nums) {
  var missing;

  for (var i = 0; i <= nums.length; i++) {
    missing ^= i ^ nums[i]
  }

  return missing;
}
