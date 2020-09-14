// 回溯算法全排列

// [leetcode] 46.全排列: https://leetcode-cn.com/problems/permutations/

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

/**
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列
 * @param {*} nums
 */
function permute(nums) {
  var result = [];
  var track = [];
  backtrack(nums, track)

  function backtrack(nums, track) {
    if (nums.length == track.length) {
      result.push(Object.assign([], track))
      return
    }

    for (let i = 0; i < nums.length; i++) {
      // 做选择
      // 合法条件
      if (track.includes(nums[i])) {
        continue;
      }
      track.push(nums[i]);
      // 做选择
      backtrack(nums, track);

      // 撤销选择
      track.pop();
    }
  }
  return result;
}

var ans = permute([1,2,3])
console.log(ans)

