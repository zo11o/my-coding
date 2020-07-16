// 本节我们写二分法查找
// 这是计算机算法中最基础 也是非常有用和重要的算法
// 《算法》第四版 1.1 算法就是二分法查找！！

// 题目：给定一个有序数组 nums, 和查找目标 target，如果target 在数组中存在，即返回数组下标，否则放回 -1

/**
 * 1. 迭代版本
 * @param {*} nums
 * @param {*} target
 */
function binarySearch(nums, target) {
  var n = nums.length;
  var lo = 0, hi = n - 1;
  var comp, mid

  while (lo <= hi) {
    mid = lo + Math.floor((hi - lo) / 2)
    comp = target - nums[mid];

    if (comp > 0) {
      lo = mid + 1
    } else if (comp < 0) {
      hi = mid - 1
    } else {
      return mid
    }
  }

  return -1
}

// 二 递归版本

export default binarySearch

