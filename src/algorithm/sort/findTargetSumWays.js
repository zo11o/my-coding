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

    var rest_sub = rest + nums[i]
    help(nums, i+1 , rest_sub);

    var rest_add = rest - nums[i]
    help(nums, i+1 , rest_add);
}