// 输入一个未重复的数组，返回所有数组的子集，包括空集

function subsets(nums) {
  const res = [];
  let track = [];
  backtrack(nums, 0, track);

  function backtrack(nums, start, track) {
    res.push(Object.assign([], track))

    for (let i = start; i < nums.length; i++) {
      const el = nums[i];
      track.push(el);
      backtrack(nums, i + 1, track);
      track.pop();
    }

  }
  return res;
}

var ans = subsets([1,2,3,4,5,6]);

export default subsets
