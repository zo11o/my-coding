/*
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-subarray
*/

/**
 * 1. 暴力法
 * @param {*} nums
 * @description leetcode 时间超过限制
 */
// var maxSubArray = function (nums) {
//   var len = nums.length;
//   var max = Number.MIN_SAFE_INTEGER;
//   for (var i = 1; i <= len; i++) {
//     for (var j = 0;
//       (j + i) <= len; j++) {
//       let c = getCount(nums, j, i)
//       if (c > max) {
//         max = c
//       }
//     }
//   }
//   return max;
// };

// function getCount(nums, s, n) {
//   var count = 0;
//   for (var i = s; i < (s + n); i++) {
//     count += nums[i]
//   }
//   return count;
// }


/* ------------------------------- 分割线 ----------------------------------- */


/**
 * 动态规划解法
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4])



/* ------------------------ 分割线 ---------------------------------- */

function Status(l, r, m, i) {
  // [l, r] 中， 以 l 为左端点的最大区间和
  this.lSum = l;
  // [l, r] 中， 以 r 为右端点的最大区间和
  this.rSum = r;
  // [l, r] 的最大区间和
  this.mSum = m;
  // [l, r] 的区间和
  this.iSum = i;
}

const pushUp = (l, r) => {
  const iSum = l.iSum + r.iSum;
  const lSum = Math.max(l.lSum, l.iSum + r.lSum);
  const rSum = Math.max(r.rSum, r.iSum + l.rSum);
  const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);
  return new Status(lSum, rSum, mSum, iSum);
}

const getInfo = (a, l, r) => {
  if (l === r) {
      return new Status(a[l], a[l], a[l], a[l]);
  }
  const m = (l + r) >> 1;
  const lSub = getInfo(a, l, m);
  const rSub = getInfo(a, m + 1, r);
  return pushUp(lSub, rSub);
}

/**
 * 线段区间合并法
 * @param {*} nums
 */
var maxSubArray = function(nums) {
  return getInfo(nums, 0, nums.length - 1).mSum;
};
