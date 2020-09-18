/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  var res = [];
  var track = [];
  var memo = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b)
  backtrack(nums, track, 0)

  function backtrack(nums, track, start) {
    // base case
    if (start > (nums.length - 1)) {
      res.push(Object.assign([], track));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 判断是否已经排列过
      if (!memo[i]) {
        track.push(nums[i]);
        memo[i] = true
        backtrack(nums, track, start + 1);
        memo[i] = false
        track.pop();
        while (i + 1 < nums.length && nums[i] == nums[i + 1]) {
          i++;
        }
      }

    }
  }
  return res;
};
