// leetcode: 494 目标和 https://leetcode-cn.com/problems/target-sum/

var result = 0

var findTargetSumWays = function(nums, S) {
    var len = nums.length
    if (!len) return 0;
    help(nums, 0, S)

    return result
};

function help (nums, i, rest) {
    if (i == nums.length) {
        if (rest == 0) {
            result++
        }
        return
    }
    help(nums, i + 1 , rest + nums[i]);
    help(nums, i + 1 , rest - nums[i]);
}

// var a = findTargetSumWays([1,1,1,1,1], 3)
// console.log(a);

export default findTargetSumWays;