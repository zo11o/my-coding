var minPatches = function (nums, n) {
  let i = 0,
    miss = 1,
    added = 0,
    len = nums.length;

  while (miss <= n) {
    if (i < len && miss >= nums[i]) {
      miss += nums[i]
      i++
    } else {
      miss += miss;
      added++
    }
  }
  return added
}

const arr = [1, 2, 4, 13, 43]
